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
            :caption="$t('nftdetail.directOffers')"
            :items="items"
            :columns="columns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
        >
            <template #column-proposedByUser="{ value }">
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
                <template v-if="actionExists(item)">
                    <a-button
                        v-if="canAccept(item)"
                        :loading="txStatus === 'pending' && pickedAddress === item.proposedBy"
                        :label="$t('nftDirectOffersGrid.accept')"
                        :disabled="tokenHasAuction"
                        :data-tooltip="tokenHasAuction ? $t('nftDirectOffersGrid.cantAccept') : null"
                        @click.native="onAcceptButtonClick(item)"
                    />
                    <a-button
                        v-else-if="canWithdraw(item)"
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
import { dataPageMixin } from '@/common/mixins/data-page.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import { mapState } from 'vuex';
import AButton from '@/common/components/AButton/AButton.vue';
import { compareAddresses } from '@/utils/address.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import erc721utils from '@/utils/erc721-utils.js';
import { isExpired } from '@/utils/date.js';
import { i18n } from '@/plugins/vue-i18n.js';
import { clone, objectEquals } from 'fantom-vue-components/src/utils';
import { datetimeFormatter } from '@/utils/formatters.js';
import { pollingMixin } from '@/common/mixins/polling.js';

const UPDATE_OFFERS_GRID = 'update-offers-grid';

export default {
    name: 'NftDirectOffersGrid',

    components: { ASignTransaction, AButton, AAddress, ATokenValue, FDataGrid },

    mixins: [dataPageMixin, pollingMixin],

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
        tokenHasAuction: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            columns: [
                {
                    name: 'proposedByUser',
                    label: this.$t('nftDirectOffersGrid.from'),
                    width: '160px',
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
                        return datetimeFormatter(value);
                    },
                    width: '150px',
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
            pickedOffer: null,
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

        userOwnsToken: {
            handler(ownsToken) {
                if (ownsToken) {
                    this.startPolling();
                } else {
                    this.stopPolling();
                }
            },
            immediate: true,
        },

        gridItemsSet(value) {
            if (value) {
                // force nft detail to update
                this.$emit('tx-success');
            }
        },

        /*walletAddress(value) {
            this.loadOwnedTokens(value);
        },*/
    },

    created() {
        this._notExpiredOfferDeadlines = [];
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }) {
            const { token } = this;

            return await getTokenOffers(token.contract, token.tokenId, pagination);
        },

        async loadOffers() {
            await this._loadPage();
        },

        /**
         * @param {Object} offer
         */
        acceptOffer(offer) {
            this.pickedAddress = offer.proposedBy;
            this.pickedOffer = clone(offer);

            this.setApproveTx(offer);
        },

        /**
         * @param {Object} offer
         */
        setApproveTx(offer) {
            const { token } = this;
            const tx = erc721utils.erc721Approve(token.contract, offer.marketplace, token.tokenId);

            tx._code = 'approve';

            this.tx = tx;
        },

        /**
         * @param {Object} offer
         */
        setAcceptOfferTx(offer) {
            const { token } = this;
            const web3 = new Web3();
            const tx = contracts.acceptOffer(token.contract, token.tokenId, offer.proposedBy, web3, offer.marketplace);

            tx._code = 'accept';

            this.tx = tx;
        },

        /**
         * @param {Object} offer
         */
        withdrawOffer(offer) {
            const { token } = this;
            const web3 = new Web3();
            const tx = contracts.cancelOffer(token.contract, token.tokenId, web3, offer.marketplace);

            tx._code = 'withdraw';

            this.pickedAddress = offer.proposedBy;
            this.pickedOffer = clone(offer);

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

        /**
         * @return {Boolean}
         */
        canAccept(offer) {
            const isProposer = this.compareAddresses(offer.proposedBy, this.walletAddress);
            return this.userOwnsToken && !isProposer;
        },

        /**
         * @param {Object} offer
         * @return {boolean}
         */
        canWithdraw(offer) {
            const canWithdraw = this.compareAddresses(offer.proposedBy, this.walletAddress);

            if (canWithdraw) {
                this.startPolling();
            }

            return canWithdraw;
        },

        /**
         * @param {Object} offer
         * @return {boolean}
         */
        actionExists(offer) {
            const notExpired = !this.isExpired(offer);

            if (notExpired) {
                if (!this._notExpiredOfferDeadlines.includes(offer.deadline)) {
                    this._notExpiredOfferDeadlines.push(offer.deadline);
                }
            }

            return notExpired;
        },

        /**
         * @param {Object} offer
         * @return {boolean}
         */
        isExpired(offer) {
            if (!offer.closed) {
                return isExpired(offer.deadline);
            }

            return true;
        },

        startPolling() {
            if (this._polling) {
                this._polling.start(
                    UPDATE_OFFERS_GRID,
                    () => {
                        this.onUpdate();
                    },
                    3000
                );
            }
        },

        stopPolling() {
            if (this._polling) {
                this._polling.stop(UPDATE_OFFERS_GRID);
            }
        },

        /**
         * @return {boolean}
         */
        someOffersExpired() {
            return this.removeExpiredOffersFromDeadlines();
        },

        /**
         * @return {boolean}
         */
        removeExpiredOffersFromDeadlines() {
            const deadlines = this._notExpiredOfferDeadlines;
            let removed = false;

            for (let i = deadlines.length - 1; i >= 0; i--) {
                if (isExpired(deadlines[i])) {
                    deadlines.splice(i, 1);
                    removed = true;
                }
            }

            // console.log('deadlines', deadlines);

            return removed;
        },

        onUpdate() {
            const { grid } = this.$refs;

            if (grid) {
                grid.reload();

                if (this.someOffersExpired()) {
                    // re-render grid
                    this.items = [...this.items];
                }
            }
        },

        /**
         * @param {Object} offer
         */
        onAcceptButtonClick(offer) {
            this.acceptOffer(offer);
        },

        /**
         * @param {Object} offer
         */
        onWithdrawButtonClick(offer) {
            this.withdrawOffer(offer);
        },

        /**
         * @param {string} txCode
         */
        onTxSuccess(txCode) {
            if (txCode === 'approve') {
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('aproveSuccess'),
                });

                this.setAcceptOfferTx(this.pickedOffer);

                this.txStatus = 'pending';

                return;
            }

            this.pickedOffer = null;

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
