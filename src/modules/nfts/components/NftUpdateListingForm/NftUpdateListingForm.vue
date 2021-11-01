<template>
    <f-form class="nftupdatelistingform grid" v-model="values" @submit="onSubmit">
        <f-form-input
            ref="priceField"
            type="a-price-field"
            :currencies="payTokens"
            :selected="listing.payToken"
            :select-immediately="true"
            name="price"
            :label="$t('nftupdatelistingform.price')"
            :validator="priceValidator"
            validate-on-input
            @token-selected="onTokenSelected"
        />

        <div class="fform_buttons">
            <a-button type="submit" size="large" :disabled="!isFormValid" :loading="txStatus === 'pending'">
                {{ $t('nftupdatelistingform.updateItem') }}
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
import AButton from '@/common/components/AButton/AButton.vue';

export default {
    name: 'NftUpdateListingForm',

    components: { AButton, ASignTransaction },

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
            },
            payTokens: [],
            selectedPayToken: {},
            tx: {},
            txStatus: '',
        };
    },

    computed: {
        isFormValid() {
            return !this.priceValidator(this.values.price);
        },
    },

    watch: {
        listing: {
            handler(value) {
                if (value.unitPrice) {
                    this.setValues(value, this.selectedPayToken);
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

        /**
         * @param {Object} values
         * @return {Promise<void>}
         */
        async updateItem(values) {
            const web3 = new Web3();
            const { token } = this;
            const price = toHex(bToTokenValue(values.price, this.selectedPayToken.decimals));

            this.tx = contracts.updateListing(
                token.contract,
                token.tokenId,
                this.selectedPayToken.address,
                price,
                web3
            );
        },

        setValues(listing, selectedPayToken) {
            if ('decimals' in selectedPayToken) {
                this.values.price = bFromTokenValue(listing.unitPrice, selectedPayToken.decimals).toNumber();
            }
        },

        priceValidator(value) {
            const val = parseFloat(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftupdatelistingform.nonZeroPrice');
            }

            return '';
        },

        onTokenSelected(token) {
            if (!('decimals' in this.selectedPayToken)) {
                this.setValues(this.listing, token);
            }

            this.selectedPayToken = token;
        },

        onSubmit(data) {
            this.updateItem(data.values);
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('nftupdatelistingform.updateSuccessful'),
                });
            }

            this.$emit('transaction-status', payload);
        },
    },
};
</script>
