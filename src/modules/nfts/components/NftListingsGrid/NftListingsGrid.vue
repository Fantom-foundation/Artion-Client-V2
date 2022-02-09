<template>
    <div class="nftlistingsgrid">
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            no-header
            max-height="400px"
            sticky-head
            class="agrid nfttmpgrid"
            infinite-scroll-root=".nfttmpgrid .fdatagrid_table"
            :items="items"
            :columns="columns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
        >
            <template #column-ownerUser="{ value }">
                <router-link :to="{ name: 'account', params: { address: value.address } }">
                    <a-address :address="value.address" :name="value.username" :image="value.avatarThumb" is-account />
                </router-link>
            </template>
            <template #column-unitPrice="{ item, value }">
                <a-token-value
                    :token="item.payToken"
                    :value="value"
                    :fraction-digits="2"
                    :use-placeholder="false"
                    no-symbol
                />
            </template>
            <template #column-actions="{ item }">
                <template v-if="!item.closed && item.isActive">
                    <a-button
                        v-if="!userOwnsToken && listingStarted(item)"
                        :loading="txStatus === 'pending'"
                        :label="$t('nftlistingsgrid.buy')"
                        @click.native="onBuyButtonClick(item)"
                    />
                    <template v-else-if="!listingStarted(item)">
                        {{ listingStartsAt(item) }}
                    </template>
                </template>
                <!-- <a-button
                    v-if="!item.closed && compareAddresses(walletAddress, item.owner)"
                    :loading="txStatus === 'pending'"
                    :label="$t('nftlistingsgrid.cancel')"
                    @click.native="onCancelButtonClick(item)"
                /> -->
            </template>
        </f-data-grid>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </div>
</template>
<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import { mapState } from 'vuex';
import AButton from '@/common/components/AButton/AButton.vue';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import { getTokenListings } from '@/modules/nfts/queries/token-listings.js';
import { checkUserBalance, getUserAllowanceTx } from '@/plugins/wallet/utils.js';
import { i18n } from '@/plugins/vue-i18n.js';
import { objectEquals } from 'fantom-vue-components/src/utils';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import { compareAddresses } from '@/utils/address.js';
import dayjs from 'dayjs';

export default {
    name: 'NftListingsGrid',

    components: { ASignTransaction, AButton, AAddress, ATokenValue, FDataGrid },

    mixins: [dataPageMixin],

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        userOwnsToken: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            columns: [
                {
                    name: 'ownerUser',
                    label: this.$t('nftlistingsgrid.from'),
                    width: '160px',
                },
                {
                    name: 'unitPrice',
                    label: this.$t('nftlistingsgrid.price'),
                    // width: '110px',
                },
                {
                    name: 'closed',
                    label: this.$t('nftlistingsgrid.status'),
                    formatter(value, item) {
                        return value
                            ? i18n.t('itemstatuses.closed')
                            : !item.isActive
                            ? i18n.t('itemstatuses.inactive')
                            : '';
                    },
                    // width: '80px',
                },
                {
                    name: 'actions',
                },
            ],
            tx: {},
            txStatus: '',
            pickedListing: null,
            payTokens: [],
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        auctionStartsIn() {
            return dayjs(this.auction.startTime).fromNow();
        },
    },

    watch: {
        token: {
            async handler(value, oldValue) {
                if (value.contract && !objectEquals(value, oldValue)) {
                    if (this.items.length > 0) {
                        this.update();
                    } else {
                        await this.loadListings();
                    }
                }
            },
            immediate: true,
        },
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            this.payTokens = await PAY_TOKENS_WITH_PRICES();
        },

        async loadPage(pagination = { first: this.perPage }) {
            const { token } = this;

            return await getTokenListings(token.contract, token.tokenId, pagination);
        },

        async loadListings() {
            await this._loadPage();
        },

        /**
         * @param {Object} listing
         * @param {boolean} [approve] If true, use erc20ApproveTx function
         */
        async buyItem(listing, approve = false) {
            if (
                (await checkUserBalance(
                    listing.unitPrice,
                    listing.payToken,
                    this.getPayTokenLabel(listing.payToken)
                )) !== null
            ) {
                const allowanceTx = await getUserAllowanceTx({
                    value: listing.unitPrice,
                    tokenAddress: listing.payToken,
                    contract: listing.marketplace,
                    approve,
                });

                console.log('allowanceTx', allowanceTx);

                if (allowanceTx) {
                    allowanceTx._code = 'buy_allowance';
                    allowanceTx._silent = true;

                    this.tx = allowanceTx;
                    this.pickedListing = listing;
                } else {
                    this.setBuyTx(listing);
                }
            }
        },

        async cancelListing(listing) {
            const web3 = new Web3();

            if (!listing.contract) {
                return;
            }

            const tx = contracts.cancelListing(listing.contract, listing.tokenId, web3, listing.marketplace);
            tx._code = 'cancel_listing';

            this.tx = tx;
        },

        getPayTokenLabel(address) {
            const token = this.payTokens.find(token => compareAddresses(token.address, address));

            return token ? token.label : '';
        },

        setBuyTx(listing) {
            const { token } = this;
            const web3 = new Web3();
            const tx = contracts.buyListedItemWithPayToken(
                token.contract,
                token.tokenId,
                listing.owner,
                listing.payToken,
                web3,
                listing.marketplace
            );

            console.log(tx);
            tx._code = 'buy';

            this.tx = tx;
        },

        update() {
            this.pageInfo = {};
            this.items = [];
            this.$nextTick(() => {
                this.$refs.grid.goToPageNum(1);
            });
            // this.loadListings();
        },

        listingStarted(listing) {
            console.log(dayjs(listing.startTime).diff(dayjs(), 'seconds'));
            return dayjs(listing.startTime).diff(dayjs(), 'seconds') < 0;
        },

        listingStartsAt(listing) {
            return `${this.$t('nftlistingsgrid.saleStarts')} ${dayjs(listing.startTime).fromNow()}`;
        },

        onBuyButtonClick(listing) {
            this.buyItem(listing);
        },

        onCancelButtonClick(listing) {
            this.cancelListing(listing);
        },

        onTxSuccess(code = '') {
            const text = this.$t('nftlistingsgrid.successfulBuy');

            if (code === 'cancel_listing') {
                this.$t('nftlistingsgrid.successfulCancel');
            }

            this.$notifications.add({
                type: 'success',
                text,
            });

            this.update();
            this.pickedListing = null;
            this.$emit('tx-success');
        },

        onTransactionStatus(payload) {
            const txCode = payload.code;
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                if (txCode === 'buy_allowance') {
                    this.setBuyTx(this.pickedListing);
                } else if (txCode === 'buy' || txCode === 'cancel_listing') {
                    this.onTxSuccess(txCode);
                }
            } else if (this.txStatus === 'error') {
                if (txCode === 'buy_allowance' && payload.error.indexOf('execution reverted') > -1) {
                    this.buyItem(this.pickedListing, true);
                }
            }
        },

        compareAddresses,
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
