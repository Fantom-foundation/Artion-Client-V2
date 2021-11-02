<template>
    <f-form class="nftsellform grid" v-model="values" @submit="onSubmit">
        <f-form-input
            ref="priceField"
            type="a-price-field"
            :currencies="payTokens"
            name="price"
            :label="$t('nftsellform.price')"
            :validator="priceValidator"
            validate-on-input
            @token-selected="onTokenSelected"
        />
        <div class="nftsellform_row">
            <f-form-input
                type="datetime"
                name="startingTime"
                :validator="startingTimeValidator"
                :in-formatter="datetimeInFormatterTimestamp"
                :out-formatter="dateOutFormatterTimestamp"
                validate-on-input
                field-size="large"
                :label="$t('nftsellform.startingTime')"
            />
            <f-form-input
                v-if="useQuantity"
                type="number"
                name="quantity"
                :validator="quantityValidator"
                validate-on-input
                field-size="large"
                min="1"
                :label="$t('nftsellform.quantity')"
                class="nftsellform_quantityfield"
            />
        </div>

        <div class="fform_buttons">
            <a-button type="submit" size="large" :disabled="!isFormValid" :loading="txStatus === 'pending'">
                {{ $t('nftsellform.listItem') }}
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
import { datetimeInFormatterTimestamp, dateOutFormatterTimestamp } from '@/utils/date.js';
import AButton from '@/common/components/AButton/AButton.vue';

export default {
    name: 'NftSellForm',

    components: { AButton, ASignTransaction },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        /** Use quantity field */
        useQuantity: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            values: {
                price: '',
                startingTime: dayjs().valueOf(),
                quantity: 1,
            },
            payTokens: [],
            selectedPayToken: null,
            tx: {},
            txStatus: '',
        };
    },

    computed: {
        isFormValid() {
            return (
                !this.priceValidator(this.values.price) &&
                !this.startingTimeValidator(this.values.startingTime) &&
                !this.quantityValidator(this.values.quantity)
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

        async sellItem(values) {
            const web3 = new Web3();
            const { token } = this;
            const price = toHex(bToTokenValue(values.price, this.selectedPayToken.decimals));
            const startingTime = parseInt(values.startingTime / 1000);
            const quantity = this.useQuantity ? parseInt(values.quantity) : 1;

            this.tx = contracts.listItem(
                token.contract,
                token.tokenId,
                quantity,
                this.selectedPayToken.address,
                price,
                startingTime,
                web3
            );
        },

        priceValidator(value) {
            const val = parseFloat(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftsellform.nonZeroPrice');
            }

            return '';
        },

        quantityValidator(value) {
            const val = parseInt(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftsellform.nonZeroQuantity');
            }

            return '';
        },

        startingTimeValidator(value) {
            console.log(value);
            // const now = dayjs().valueOf();

            // return dayjs(value).valueOf() <= now ? this.$t('nftsellform.badDate') : '';
            return '';
        },

        onTokenSelected(token) {
            this.selectedPayToken = token;
        },

        onSubmit(data) {
            this.sellItem(data.values);
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('nftsellform.sellSuccess'),
                });
            }

            this.$emit('transaction-status', payload);
        },

        datetimeInFormatterTimestamp,
        dateOutFormatterTimestamp,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
