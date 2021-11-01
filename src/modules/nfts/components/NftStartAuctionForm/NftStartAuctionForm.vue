<template>
    <f-form
        class="nftstartauctionform grid"
        v-model="values"
        @submit="onSubmit"
        :aria-label="$t('nftstartauctionwindow.title')"
    >
        <f-form-input
            ref="priceField"
            type="a-price-field"
            :currencies="payTokens"
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
        <!-- temporary, replace with own datetime component -->
        <f-form-input
            type="datetime"
            name="startTime"
            :validator="startTimeValidator"
            :in-formatter="datetimeInFormatterTimestamp"
            :out-formatter="dateOutFormatterTimestamp"
            validate-on-input
            field-size="large"
            :label="$t('nftstartauctionform.startTime')"
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
        <f-form-input type="checkbox" :label="$t('nftstartauctionform.minBid')" name="minBid" />

        <div class="fform_buttons">
            <a-button type="submit" size="large" :loading="txStatus === 'pending'">
                {{ $t('nftstartauctionform.startAuction') }}
            </a-button>
        </div>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </f-form>
</template>
<script>
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import { bToTokenValue, toHex } from '@/utils/big-number.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import dayjs from 'dayjs';
import AButton from '@/common/components/AButton/AButton.vue';
import { dateOutFormatterTimestamp, datetimeInFormatterTimestamp } from '@/utils/date.js';

export default {
    name: 'NftStartAuctionForm',

    components: { AButton, ASignTransaction },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
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
            },
            payTokens: [],
            selectedPayToken: null,
            tx: {},
            txStatus: '',
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
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            this.payTokens = await PAY_TOKENS_WITH_PRICES();
            this.selectedPayToken = this.payTokens[0];
        },

        async setTx(values) {
            const web3 = new Web3();
            const { token } = this;

            const reservePrice = values.reservePrice
                ? toHex(bToTokenValue(values.reservePrice, this.selectedPayToken.decimals))
                : '0x0';
            const startTime = parseInt(values.startTime / 1000);
            const endTime = parseInt(values.endTime / 1000);

            console.log('token.tokenId', token.tokenId, this.selectedPayToken.address, values.minBid);

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

            console.log('tx: ', tx);

            // this.tx = tx;
        },

        reservePriceValidator(value) {
            const val = parseFloat(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftstartauctionform.nonZeroPrice');
            }

            return '';
        },

        startTimeValidator(value) {
            const ts = dateOutFormatterTimestamp(value || this.values.startTime);
            const tsEndTime = dateOutFormatterTimestamp(this.values.endTime);

            if (isNaN(ts)) {
                return this.$t('nftstartauctionform.fillDate');
            }

            return ts >= tsEndTime ? this.$t('nftstartauctionform.startDateLower') : '';
        },

        endTimeValidator(value) {
            const ts = dateOutFormatterTimestamp(value || this.values.endTime);
            const tsStartTime = dateOutFormatterTimestamp(this.values.startTime);

            if (isNaN(ts)) {
                return this.$t('nftstartauctionform.fillDate');
            }

            return ts <= tsStartTime ? this.$t('nftstartauctionform.endDateGreater') : '';
        },

        onTokenSelected(token) {
            this.selectedPayToken = token;
        },

        onSubmit(data) {
            const { values } = data;

            if (this.isFormValid) {
                this.setTx(values);
            }
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('nftstartauctionform.startSuccess'),
                });
            }

            this.$emit('transaction-status', payload);
        },

        datetimeInFormatterTimestamp,
        dateOutFormatterTimestamp,
    },
};
</script>
