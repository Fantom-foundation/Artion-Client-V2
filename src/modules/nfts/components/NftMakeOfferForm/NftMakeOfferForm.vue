<template>
    <f-form
        class="nftmakeofferform grid"
        v-model="values"
        @submit="onSubmit"
        :aria-label="$t('nftMakeOfferForm.placeOffer')"
    >
        <f-form-input
            ref="priceField"
            type="a-price-field"
            :currencies="payTokens"
            :selected="listing.payToken"
            name="price"
            :label="$t('nftMakeOfferForm.price')"
            :validator="priceValidator"
            validate-on-input
            @token-selected="onTokenSelected"
        >
            <template #bottom="{ validationState, errorMsgId, infoTextId }">
                <div class="fform_errwithinfo">
                    <f-error-messages :errors="validationState.errors" :errors-cont-id="errorMsgId" />
                    <f-info-text :info-text-id="infoTextId">
                        <span>{{ $t('balance') }}:</span>
                        <a-token-value
                            :token="{ ...selectedPayToken, img: '' }"
                            :value="toHex(bAccountBalance)"
                            :fraction-digits="2"
                            :is-pay-token="false"
                            :use-placeholder="false"
                        />
                    </f-info-text>
                </div>
            </template>
        </f-form-input>
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
            <a-button type="submit" size="large" :loading="txStatus === 'pending'">
                {{ $t('nftMakeOfferForm.placeOffer') }}
            </a-button>
        </div>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </f-form>
</template>
<script>
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import { bFromTokenValue, bToTokenValue, toBigNumber, toHex } from '@/utils/big-number.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import { getErc20TokenBalance } from '@/modules/wallet/queries/erc20-token-balance.js';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import dayjs from 'dayjs';
import { datetimeInFormatterTimestamp, dateOutFormatterTimestamp } from '@/utils/date.js';
import AButton from '@/common/components/AButton/AButton.vue';
import { getUserAllowanceTx } from '@/plugins/wallet/utils.js';
import { getPayToken } from '@/utils/pay-tokens.js';
import { getContractAddress } from '@/utils/artion-contract-addresses.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import FErrorMessages from 'fantom-vue-components/src/components/FErrorMessages/FErrorMessages.vue';
import FInfoText from 'fantom-vue-components/src/components/FInfoText/FInfoText.vue';

export default {
    name: 'NftMakeOfferForm',

    components: { ATokenValue, AButton, ASignTransaction, FErrorMessages, FInfoText },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        listing: {
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
            bAccountBalance: null,
            tx: {},
            txStatus: '',
            storedValues: {},
        };
    },

    watch: {
        /**
         * @param {PayToken} token
         * @param {PayToken|null} oldValue
         * @return {Promise<void>}
         */
        async selectedPayToken(token, oldValue) {
            const balance = await getErc20TokenBalance(this.$wallet.account, token.address);

            this.bAccountBalance = toBigNumber(balance);
            this.accountBalance = bFromTokenValue(balance, token.decimals).toNumber();

            if (oldValue !== null) {
                this.revalidatePriceField();
            }
        },
    },

    created() {
        this._contract = '';

        this.init();
    },

    methods: {
        async init() {
            this.payTokens = await PAY_TOKENS_WITH_PRICES();

            if (this.listing.payToken) {
                this.selectedPayToken = await getPayToken(this.listing.payToken, this.payTokens);
            } else {
                this.selectedPayToken = this.payTokens[0];
            }
        },

        /**
         * @param {Object} values
         * @param {boolean} [approve] If true, use erc20ApproveTx function
         */
        async placeOffer(values, approve = false) {
            const { storedValues } = this;
            this._contract = await getContractAddress('marketplace');

            if (!approve) {
                storedValues.price = toHex(bToTokenValue(values.price, this.selectedPayToken.decimals));
                storedValues.deadline = parseInt(values.deadline / 1000);
            }

            const allowanceTx = await getUserAllowanceTx({
                value: storedValues.price,
                tokenAddress: this.selectedPayToken.address,
                contract: this._contract,
                approve,
            });

            if (allowanceTx) {
                allowanceTx._code = 'create_offer_allowance';
                allowanceTx._silent = true;

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
                web3,
                this._contract
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
            } else if (this.txStatus === 'error') {
                if (txCode === 'create_offer_allowance' && payload.error.indexOf('execution reverted') > -1) {
                    this.placeOffer({}, true);
                }
            }

            this.$emit('transaction-status', payload);
        },

        datetimeInFormatterTimestamp,
        dateOutFormatterTimestamp,
        toHex,
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
