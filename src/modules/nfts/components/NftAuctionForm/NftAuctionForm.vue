<template>
    <f-form
        class="nftstartauctionform grid"
        v-model="values"
        @submit="onSubmit"
        :aria-label="!update ? $t('nftstartauctionwindow.title') : $t('nftupdateauctionwindow.title')"
    >
        <f-form-input
            ref="priceField"
            type="a-price-field"
            :currencies="payTokens"
            :selected="auction.payToken"
            :select-immediately="true"
            :currency-dropdown-disabled="update"
            name="reservePrice"
            :validator="reservePriceValidator"
            validate-on-input
            @token-selected="onTokenSelected"
        >
            <template #label>
                {{ $t('nftstartauctionform.reservePrice') }}
                <!--                <button
                    class="btn-nostyle"
                    :data-tooltip="$t('nftstartauctionform.reservePriceInfo')"
                    :aria-label="$t('nftstartauctionform.reservePriceInfo')"
                >
                    <app-iconset icon="question" />
                </button>-->
            </template>
        </f-form-input>
        <f-form-input
            type="datetime"
            name="startTime"
            :validator="startTimeValidator"
            :in-formatter="datetimeInFormatterTimestamp"
            :out-formatter="dateOutFormatterTimestamp"
            validate-on-input
            field-size="large"
            :label="$t('nftstartauctionform.startTime')"
            :disabled="startTimeDisabled"
            class="md:col-6"
        />
        <f-form-input
            type="datetime"
            name="endTime"
            :validator="endTimeValidator"
            :in-formatter="datetimeInFormatterTimestamp"
            :out-formatter="dateOutFormatterTimestamp"
            validate-on-input
            field-size="large"
            :label="$t('nftstartauctionform.auctionExpiration')"
            class="md:col-6"
        />
        <f-form-input
            type="checkbox"
            :label="$t('nftstartauctionform.minBid')"
            name="minBid"
            :disabled="minBidDisabled"
        />

        <div class="fform_buttons">
            <a-button type="submit" size="large" :loading="txStatus === 'pending'">
                {{ !update ? $t('nftstartauctionform.startAuction') : $t('nftstartauctionform.updateAuction') }}
            </a-button>
        </div>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </f-form>
</template>
<script>
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import { bFromTokenValue, bToTokenValue, toHex } from '@/utils/big-number.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import dayjs from 'dayjs';
import AButton from '@/common/components/AButton/AButton.vue';
import { dateOutFormatterTimestamp, datetimeInFormatterTimestamp } from '@/utils/date.js';
import { objectEquals } from 'fantom-vue-components/src/utils';
import { getAuction } from '@/modules/nfts/queries/auction.js';

export default {
    name: 'NftAuctionForm',

    components: { AButton, ASignTransaction },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        /** Update mode of auction form */
        update: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            values: {
                reservePrice: '',
                startTime: dayjs()
                    .add(2, 'minutes')
                    .valueOf(),
                endTime: dayjs()
                    .add(1, 'day')
                    .add(2, 'minutes')
                    .valueOf(),
                minBid: false,
            },
            /** @type {Auction} */
            auction: {},
            payTokens: [],
            selectedPayToken: {},
            tx: {},
            txStatus: '',
            initialValues: {},
            startTimeDisabled: false,
            // transaction queue for auction update
            transactions: [],
        };
    },

    computed: {
        isFormValid() {
            const { values } = this;

            return (
                !this.reservePriceValidator(values.reservePrice) &&
                !this.startTimeValidator(values.startTime) &&
                !this.endTimeValidator(values.endTime)
            );
        },

        /*startTimeDisabled() {
            return this.update && dayjs(this.values.startTime).valueOf() < Date.now();
        },*/

        minBidDisabled() {
            return this.update;
        },
    },

    watch: {
        token: {
            handler(value) {
                if (value.contract) {
                    this.loadAuction();
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

        async loadAuction() {
            this.auction = (await getAuction(this.token.contract, this.token.tokenId)) || {};

            this.setValues(this.auction, this.selectedPayToken);
        },

        /**
         * @param {Object} values Form values
         * @return {Promise<void>}
         */
        async createAuction(values) {
            const web3 = new Web3();
            const { token } = this;

            const reservePrice = values.reservePrice
                ? toHex(bToTokenValue(values.reservePrice, this.selectedPayToken.decimals))
                : '0x0';
            const startTime = parseInt(values.startTime / 1000);
            const endTime = parseInt(values.endTime / 1000);

            // console.log('token.tokenId', token.tokenId, this.selectedPayToken.address, values.minBid);

            const tx = contracts.createAuction(
                token.contract,
                token.tokenId,
                this.selectedPayToken.address,
                reservePrice,
                startTime,
                endTime,
                values.minBid,
                web3
            );

            tx._code = 'start_auction';

            this.tx = tx;
        },

        /**
         * @param {Object} values Form values
         * @return {Promise<void>}
         */
        async updateAuction(values) {
            const { initialValues } = this;
            const { transactions } = this;

            if (values.startTime !== initialValues.startTime) {
                transactions.push(this.getUpdateAuctionStartTimeTx(values.startTime));
            }

            if (values.endTime !== initialValues.endTime) {
                transactions.push(this.getUpdateAuctionEndTimeTx(values.endTime));
            }

            if (values.reservePrice !== initialValues.reservePrice) {
                transactions.push(this.getUpdateAuctionReservePriceTx(values.reservePrice));
            }

            if (transactions.length > 0) {
                this.tx = transactions.pop();
            }
        },

        /**
         * @param {Auction} auction
         * @param {PayToken} selectedPayToken
         */
        setValues(auction, selectedPayToken) {
            const { values } = this;

            if (!this.update) {
                return;
            }

            if ('decimals' in selectedPayToken) {
                values.reservePrice = bFromTokenValue(auction.reservePrice, selectedPayToken.decimals).toNumber();
                values.minBid = !!auction.minBidAmount;

                values.startTime = dayjs(auction.startTime)
                    .startOf('minute')
                    .valueOf();

                values.endTime = dayjs(auction.endTime)
                    .startOf('minute')
                    .valueOf();

                this.initialValues = { ...values };

                this.startTimeDisabled = dayjs(auction.startTime).valueOf() < Date.now();
            }
        },

        getUpdateAuctionReservePriceTx(reservePrice) {
            const web3 = new Web3();
            const { token } = this;

            const tx = contracts.updateAuctionReservePrice(
                token.contract,
                token.tokenId,
                reservePrice ? toHex(bToTokenValue(reservePrice, this.selectedPayToken.decimals)) : '0x0',
                web3
            );

            tx._code = 'update_auction_reserve_price';

            return tx;
        },

        /**
         * @param {number} startTime Timestamp
         * @return {{data: *|string, from: *, to: *, value: string}}
         */
        getUpdateAuctionStartTimeTx(startTime) {
            const web3 = new Web3();
            const { token } = this;

            const tx = contracts.updateAuctionStartTime(
                token.contract,
                token.tokenId,
                parseInt(startTime / 1000),
                web3
            );

            tx._code = 'update_auction_start_time';

            return tx;
        },

        /**
         * @param {number} endTime Timestamp
         * @return {{data: *|string, from: *, to: *, value: string}}
         */
        getUpdateAuctionEndTimeTx(endTime) {
            const web3 = new Web3();
            const { token } = this;

            const tx = contracts.updateAuctionEndTime(token.contract, token.tokenId, parseInt(endTime / 1000), web3);

            tx._code = 'update_auction_end_time';

            return tx;
        },

        /**
         * @param {string} value
         * @return {VueI18n.TranslateResult|string}
         */
        reservePriceValidator(value) {
            const val = parseFloat(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftstartauctionform.nonZeroPrice');
            }

            return '';
        },

        /**
         * @param {string} value
         * @return {VueI18n.TranslateResult|string}
         */
        startTimeValidator(value) {
            const ts = dateOutFormatterTimestamp(value || this.values.startTime);
            const tsEndTime = dateOutFormatterTimestamp(this.values.endTime);
            const tsNow = Date.now();
            let msg = '';

            if (isNaN(ts)) {
                msg = this.$t('nftstartauctionform.fillDate');
            } else if (ts >= tsEndTime) {
                msg = this.$t('nftstartauctionform.startDateLower');
            } else if (ts <= tsNow && !this.startTimeDisabled) {
                msg = this.$t('nftstartauctionform.dateLowerNow');
            }

            return msg;
        },

        /**
         * @param {string} value
         * @return {VueI18n.TranslateResult|string}
         */
        endTimeValidator(value) {
            const ts = dateOutFormatterTimestamp(value || this.values.endTime);
            const tsStartTime = dateOutFormatterTimestamp(this.values.startTime);
            const tsNow = dayjs().add(7, 'minutes');
            let msg = '';

            if (isNaN(ts)) {
                msg = this.$t('nftstartauctionform.fillDate');
            } else if (ts <= tsStartTime) {
                msg = this.$t('nftstartauctionform.endDateGreater');
            } else if (ts <= tsNow) {
                msg = this.$t('nftstartauctionform.dateLowerNowPlus5');
            }

            return msg;
        },

        /**
         * @param {PayToken} token
         */
        onTokenSelected(token) {
            if (!('decimals' in this.selectedPayToken)) {
                this.setValues(this.auction, token);
            }

            this.selectedPayToken = token;
        },

        /**
         * @param {Object} data
         */
        onSubmit(data) {
            const { values } = data;

            if (this.isFormValid) {
                this.transactions = [];

                if (!this.update) {
                    this.createAuction(values);
                } else if (objectEquals(this.initialValues, values)) {
                    this.$notifications.add({
                        type: 'warning',
                        text: 'Nothing to update',
                    });
                } else {
                    this.updateAuction(values);
                }
            }
        },

        /**
         * @param {TransactionStatus} payload
         */
        onTransactionStatus(payload) {
            const { transactions } = this;
            const txCode = payload.code;
            let msg = '';

            this.txStatus = payload.status;

            console.log('!!!', this.txStatus, txCode);

            if (this.txStatus === 'success') {
                if (txCode === 'start_auction') {
                    msg = this.$t('nftstartauctionform.startSuccess');
                } else if (txCode === 'update_auction_reserve_price') {
                    msg = this.$t('nftstartauctionform.updatePriceSuccess');
                } else if (txCode === 'update_auction_start_time') {
                    msg = this.$t('nftstartauctionform.updateStartTimeSuccess');
                } else if (txCode === 'update_auction_end_time') {
                    msg = this.$t('nftstartauctionform.updateEndTimeSuccess');
                }

                if (msg) {
                    this.$notifications.add({
                        type: 'success',
                        text: msg,
                    });
                }
            }

            this.$emit('transaction-status', { ...payload, transactionsLeft: transactions.length });

            if (transactions.length > 0) {
                this.$nextTick(() => {
                    this.tx = transactions.pop();
                });
            }
        },

        datetimeInFormatterTimestamp,
        dateOutFormatterTimestamp,
    },
};
</script>
