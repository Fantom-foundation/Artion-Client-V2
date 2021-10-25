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
                        v-if="userCreatedToken"
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
        userCreatedToken: {
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
                    width: '100px',
                },
                {
                    name: 'unitPrice',
                    label: this.$t('nftDirectOffersGrid.price'),
                },
                {
                    name: 'deadline',
                    label: this.$t('nftDirectOffersGrid.expires'),
                    formatter(value) {
                        return dayjs(value).format('DD.MM.YYYY HH:mm');
                    },
                },
                {
                    name: 'actions',
                },
            ],
            tx: {},
            txStatus: '',
            pickedAddress: '',
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        token: {
            handler(value) {
                if (value.contract) {
                    this.loadOffers();
                }
            },
            immediate: true,
        },

        /*walletAddress() {
            this.loadOffers();
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
            this.$nextTick(() => {
                this.$refs.grid.goToPageNum(1);
            });
            // this.loadOffers();
        },

        isExpired(offer) {
            if (!offer.closed) {
                const now = dayjs();
                const deadline = dayjs(offer.deadline);

                return deadline.diff(now) <= 0;
            }

            return true;

            /*console.log('isExpired', offer);
            return false;*/
        },

        onAcceptButtonClick(offer) {
            this.acceptOffer(offer);
        },

        onWithdrawButtonClick(offer) {
            this.withdrawOffer(offer);
        },

        onTxSuccess(txCode) {
            console.log('onTxSuccess', txCode);

            this.$notifications.add({
                type: 'success',
                text:
                    txCode === 'withdraw'
                        ? this.$t('nftDirectOffersGrid.withdrawSuccess')
                        : this.$t('nftDirectOffersGrid.acceptSuccess'),
            });

            this.update();
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
