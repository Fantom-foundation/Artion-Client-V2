<template>
    <div class="nftdirectoffersgrid">
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
            <template #column-proposedBy="{ value }">
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
                <template v-if="!isExpired(item)">
                    <a-button
                        v-if="userOwnsToken"
                        :loading="txStatus === 'pending' && pickedAddress === item.proposedBy"
                        :label="$t('nftDirectOffersGrid.accept')"
                        @click.native="onAcceptButtonClick(item)"
                    />
                    <a-button
                        v-else-if="compareAddresses(item.proposedBy, walletAddress)"
                        :loading="txStatus === 'pending' && pickedAddress === item.proposedBy"
                        :label="$t('nftDirectOffersGrid.withdraw')"
                        @click.native="onWithdrawButtonClick(item)"
                    />
                </template>
            </template>
        </f-data-grid>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </div>
</template>
<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import { getTokenOffers } from '@/modules/nfts/queries/token-offers.js';
import dayjs from 'dayjs';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import { mapState } from 'vuex';
import AButton from '@/common/components/AButton/AButton.vue';
import { compareAddresses } from '@/utils/address.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import { isExpired } from '@/utils/date.js';
import { i18n } from '@/plugins/vue-i18n.js';
import { objectEquals } from 'fantom-vue-components/src/utils';

export default {
    name: 'NftDirectOffersGrid',

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
                    name: 'proposedBy',
                    label: this.$t('nftDirectOffersGrid.from'),
                    width: '110px',
                },
                {
                    name: 'unitPrice',
                    label: this.$t('nftDirectOffersGrid.price'),
                    width: '110px',
                },
                {
                    name: 'deadline',
                    label: this.$t('nftDirectOffersGrid.expires'),
                    formatter(value) {
                        return dayjs(value).format('DD.MM.YYYY HH:mm');
                    },
                },
                {
                    name: 'closed',
                    label: this.$t('nftDirectOffersGrid.status'),
                    formatter(value, item) {
                        return value
                            ? i18n.t('itemstatuses.closed')
                            : isExpired(item.deadline)
                            ? i18n.t('itemstatuses.expired')
                            : '';
                    },
                    width: '80px',
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
                    if (this.items.length > 0) {
                        this.update();
                    } else {
                        await this.loadOffers();
                    }
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

            return await getTokenOffers(token.contract, token.tokenId, pagination);
        },

        async loadOffers() {
            await this._loadPage();
        },

        acceptOffer(offer) {
            const { token } = this;
            const web3 = new Web3();
            const tx = contracts.acceptOffer(token.contract, token.tokenId, offer.proposedBy, web3);

            tx._code = 'accept';

            this.pickedAddress = offer.proposedBy;

            this.tx = tx;
            // alert('Not implemented yew');
        },

        withdrawOffer(offer) {
            const { token } = this;
            const web3 = new Web3();
            const tx = contracts.cancelOffer(token.contract, token.tokenId, web3);

            tx._code = 'withdraw';

            this.pickedAddress = offer.proposedBy;

            this.tx = tx;
        },

        update() {
            this.pageInfo = {};
            this.items = [];
            this.$nextTick(() => {
                this.$refs.grid.goToPageNum(1);
            });
            // this.loadOffers();
        },

        isExpired(offer) {
            if (!offer.closed) {
                return isExpired(offer.deadline);
            }

            return true;
        },

        onAcceptButtonClick(offer) {
            this.acceptOffer(offer);
        },

        onWithdrawButtonClick(offer) {
            this.withdrawOffer(offer);
        },

        onTxSuccess(txCode) {
            this.$notifications.add({
                type: 'success',
                text:
                    txCode === 'withdraw'
                        ? this.$t('nftDirectOffersGrid.withdrawSuccess')
                        : this.$t('nftDirectOffersGrid.acceptSuccess'),
            });

            this.update();
            this.$emit('tx-success');
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.onTxSuccess(payload.code);
            }

            if (this.txStatus !== 'pending') {
                this.pickedAddress = '';
            }
        },

        compareAddresses,
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
