<template>
    <f-form class="nftmakeofferform grid" v-model="values" @submit="onSubmit">
        <f-form-input
            ref="priceField"
            type="a-price-field"
            :currencies="payTokens"
            name="price"
            :label="$t('nftMakeOfferForm.price')"
            :validator="priceValidator"
            validate-on-input
            @token-selected="onTokenSelected"
        />
        <f-form-input
            type="datetime"
            name="deadline"
            :validator="deadlineValidator"
            :in-formatter="datetimeInFormatterTimestamp"
            :out-formatter="dateOutFormatterTimestamp"
            validate-on-input
            field-size="large"
            :label="$t('nftMakeOfferForm.offerExpiration')"
        />

        <div class="fform_buttons">
            <a-button type="submit" size="large" :disabled="!isFormValid" :loading="txStatus === 'pending'">
                {{ $t('nftMakeOfferForm.placeOffer') }}
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
import { getErc20TokenBalance } from '@/modules/wallet/queries/erc20-token-balance.js';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import dayjs from 'dayjs';
import { datetimeInFormatterTimestamp, dateOutFormatterTimestamp } from '@/utils/date.js';
import AButton from '@/common/components/AButton/AButton.vue';
import { getUserAllowanceTx } from '@/plugins/wallet/utils.js';

export default {
    name: 'NftMakeOfferForm',

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
                price: '',
                deadline: dayjs()
                    .add(1, 'day')
                    .valueOf(),
            },
            payTokens: [],
            selectedPayToken: null,
            accountBalance: 0,
            tx: {},
            txStatus: '',
            storedValues: {},
        };
    },

    computed: {
        isFormValid() {
            return !this.priceValidator(this.values.price) && !this.deadlineValidator(this.values.deadline);
        },
    },

    watch: {
        /**
         * @param {PayToken} token
         * @param {PayToken|null} oldValue
         * @return {Promise<void>}
         */
        async selectedPayToken(token, oldValue) {
            const balance = await getErc20TokenBalance(this.$wallet.account, token.address);

            this.accountBalance = bFromTokenValue(balance, token.decimals).toNumber();

            if (oldValue !== null) {
                this.revalidatePriceField();
            }
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

        /**
         * @param {Object} values
         */
        async placeOffer(values) {
            const { storedValues } = this;

            storedValues.price = toHex(bToTokenValue(values.price, this.selectedPayToken.decimals));
            storedValues.deadline = parseInt(values.deadline / 1000);

            const allowanceTx = await getUserAllowanceTx({
                value: storedValues.price,
                tokenAddress: this.selectedPayToken.address,
                contract: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
            });

            if (allowanceTx) {
                allowanceTx._code = 'create_offer_allowance';

                this.tx = allowanceTx;
            } else {
                this.setCreateOfferTx(storedValues.price, storedValues.deadline);
            }
        },

        /**
         * @param {string} price
         * @param {number} deadline
         */
        setCreateOfferTx(price, deadline) {
            const web3 = new Web3();
            const { token } = this;

            const tx = contracts.createOffer(
                token.contract,
                token.tokenId,
                this.selectedPayToken.address,
                1,
                price,
                deadline,
                web3
            );

            tx._code = 'create_offer';

            this.tx = tx;
        },

        /**
         * @param {string} value
         * @return {VueI18n.TranslateResult|string}
         */
        priceValidator(value) {
            const val = parseFloat(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftMakeOfferForm.nonZeroPrice');
            } else if (this.accountBalance < val) {
                return this.$t('nftMakeOfferForm.insufficientBalance');
            }

            return '';
        },

        /**
         * @param {string} value
         * @return {VueI18n.TranslateResult|string}
         */
        deadlineValidator(value) {
            const now = dayjs().valueOf();

            return dayjs(value).valueOf() <= now ? this.$t('nftMakeOfferForm.badDate') : '';
        },

        revalidatePriceField() {
            // oolalaa
            this.$refs.priceField.$refs.input.$refs.input.validate();
        },

        /**
         * @param {PayToken} token
         */
        onTokenSelected(token) {
            this.selectedPayToken = token;
        },

        /**
         * @param {Object} data
         */
        onSubmit(data) {
            this.placeOffer(data.values);
        },

        /**
         * @param {TransactionStatus} payload
         */
        onTransactionStatus(payload) {
            const txCode = payload.code;
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                if (txCode === 'create_offer_allowance') {
                    this.setCreateOfferTx(this.storedValues.price, this.storedValues.deadline);
                } else if (txCode === 'create_offer') {
                    this.storedValues = {};
                    this.$notifications.add({
                        type: 'success',
                        text: this.$t('nftMakeOfferForm.makeOfferSuccess'),
                    });
                }
            }

            this.$emit('transaction-status', payload);
        },

        datetimeInFormatterTimestamp,
        dateOutFormatterTimestamp,
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
