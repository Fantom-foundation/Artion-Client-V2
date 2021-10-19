<template>
    <f-form class="nftplacebidform grid" v-model="values" @submit="onSubmit">
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
                {{ $t('nftplacebidform.price') }}
            </template>
        </f-form-input>

        <div class="fform_buttons">
            <a-button type="submit" size="large" :disabled="!isFormValid" :loading="txStatus.status === 'pending'">
                {{ $t('nftplacebidform.placeBid') }}
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
import { mapState } from 'vuex';
import AButton from '@/common/components/AButton/AButton.vue';

export default {
    name: 'NftPlaceBidForm',

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
            },
            payTokens: [],
            selectedPayToken: null,
            tx: {},
        };
    },

    computed: {
        ...mapState('app', {
            txStatus: 'txStatus',
        }),

        isFormValid() {
            return (
                !this.reservePriceValidator(this.values.reservePrice) &&
                (!this.startTimeValidator() || !this.endTimeValidator())
            );
        },
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            this.payTokens = await PAY_TOKENS_WITH_PRICES();
            this.selectedPayToken = this.payTokens[0]; // nastavit spravny pay token z detailu nft
        },

        async setTx(values) {
            const web3 = new Web3();
            const { token } = this;

            const reservePrice = values.reservePrice
                ? toHex(bToTokenValue(values.reservePrice, this.selectedPayToken.decimals))
                : '0x0';
            const startTime = parseInt(values.startTime / 1000);
            const endTime = parseInt(values.endTime / 1000);

            console.log('token.tokenId', token.tokenId);

            const tx = contracts.createAuction(
                token.contract,
                token.tokenId,
                this.selectedPayToken.address,
                reservePrice,
                startTime,
                endTime,
                web3
            );

            console.log('tx: ', tx);

            this.tx = tx;
        },

        reservePriceValidator(value) {
            const val = parseFloat(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftplacebidform.nonZeroPrice');
            }

            return '';
        },

        onSubmit(data) {
            const { values } = data;

            this.setTx(values);
        },

        onTransactionStatus(payload) {
            console.log('onTransactionStatus', JSON.stringify(payload));
        },
    },
};
</script>
