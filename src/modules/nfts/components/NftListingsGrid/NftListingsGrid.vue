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
            <template #column-owner="{ value }">
                <router-link :to="{ name: 'account', params: { address: value } }">
                    <a-address :address="value" />
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
                <template v-if="!item.closed">
                    <a-button
                        v-if="!userOwnsToken"
                        :loading="txStatus === 'pending'"
                        :label="$t('nftlistingsgrid.buy')"
                        @click.native="onBuytButtonClick(item)"
                    />
                </template>
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
import { checkUserBalance } from '@/plugins/wallet/utils.js';
import { i18n } from '@/plugins/vue-i18n.js';
import { objectEquals } from 'fantom-vue-components/src/utils';

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
                    name: 'owner',
                    label: this.$t('nftlistingsgrid.from'),
                    // width: '110px',
                },
                {
                    name: 'unitPrice',
                    label: this.$t('nftlistingsgrid.price'),
                    // width: '110px',
                },
                {
                    name: 'closed',
                    label: this.$t('nftlistingsgrid.status'),
                    formatter(value) {
                        return value ? i18n.t('itemstatuses.closed') : '';
                    },
                    // width: '80px',
                },
                {
                    name: 'actions',
                },
            ],
            tx: {},
            txStatus: '',
            pickedAddress: '',
            // tokens owned by user
            ownedTokens: [],
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        token: {
            async handler(value, oldValue) {
                if (value.contract && !objectEquals(value, oldValue)) {
                    await this.loadListings();
                }
            },
            immediate: true,
        },

        /*walletAddress(value) {
            this.loadOwnedTokens(value);
        },*/
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }) {
            const { token } = this;

            return await getTokenListings(token.contract, token.tokenId, pagination);
        },

        async loadListings() {
            await this._loadPage();
        },

        async buyItem(listing) {
            const { token } = this;
            const web3 = new Web3();

            if ((await checkUserBalance(listing.unitPrice, listing.payToken)) !== null) {
                /*const allowanceTx = await getUserAllowanceTx({
                    value: listing.unitPrice,
                    tokenAddress: this.payToken.address,
                    contract: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
                });

                console.log('allowanceTx', allowanceTx);*/

                console.log(token.contract, parseInt(token.tokenId, 16), listing.owner);

                const tx = contracts.buyListedItem(token.contract, token.tokenId, listing.owner, web3);

                console.log(tx);

                this.tx = tx;
            }
        },

        update() {
            this.pageInfo = {};
            this.items = [];
            this.$nextTick(() => {
                this.$refs.grid.goToPageNum(1);
            });
            // this.loadListings();
        },

        onBuytButtonClick(listing) {
            this.buyItem(listing);
        },

        onTxSuccess() {
            this.$notifications.add({
                type: 'success',
                text: this.$t('nftlistingsgrid.buySuccess'),
            });

            this.update();
            this.$emit('tx-success');
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.onTxSuccess();
            }

            if (this.txStatus !== 'pending') {
                this.pickedAddress = '';
            }
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
