<template>
    <f-form class="nftmakeofferform grid" v-model="values" @submit="onSubmit">
        <f-form-input
            ref="priceField"
            type="a-price-field"
            :currencies="payTokens"
            name="price"
            :label="$t('nftmakeofferform.price')"
            :validator="priceValidator"
            validate-on-input
            @token-selected="onTokenSelected"
        />
        <f-form-input
            type="date"
            name="deadline"
            :validator="deadlineValidator"
            :in-formatter="ifo"
            :out-formatter="ofo"
            validate-on-input
            field-size="large"
            :label="$t('nftmakeofferform.offerExpiration')"
        />

        <div class="fform_buttons">
            <f-button type="submit" size="large" :disabled="!isFormValid">
                {{ $t('nftmakeofferform.placeOffer') }}
            </f-button>
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

export default {
    name: 'NftMakeOfferForm',

    components: { ASignTransaction },

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
        };
    },

    computed: {
        isFormValid() {
            return !this.priceValidator(this.values.price) && !this.deadlineValidator(this.values.deadline);
        },
    },

    watch: {
        async selectedPayToken(token, oldValue) {
            const balance = await getErc20TokenBalance(this.$wallet.account, token.address);

            this.accountBalance = bFromTokenValue(balance, token.priceDecimals).toNumber();

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

            // TMP
            // await this.$wallet._verifyTransaction('0xb9e742176ee9676b879e0cb79a063b76d30425cb77ec6114f185150ec18a0382');
        },

        priceValidator(value) {
            const val = parseFloat(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftmakeofferform.nonZeroPrice');
            } else if (this.accountBalance < val) {
                return this.$t('nftmakeofferform.unsufficientBalance');
            }

            return '';
        },

        deadlineValidator(value) {
            const now = dayjs().valueOf();

            return dayjs(value).valueOf() <= now ? this.$t('nftmakeofferform.badDate') : '';
        },

        async setTx(values) {
            const web3 = new Web3();
            const { token } = this;

            console.log(JSON.stringify(values));

            const price = toHex(bToTokenValue(values.price, this.selectedPayToken.priceDecimals));
            const deadline = parseInt(values.deadline / 1000);

            console.log(price, deadline, this.selectedPayToken.address);

            const tx = contracts.createOffer(
                token.contract,
                token.tokenId,
                this.selectedPayToken.address,
                1,
                price,
                deadline,
                // '1',
                web3
            );
            // tx.from = this.$wallet.account;

            // console.log(JSON.stringify(tx));
            // console.log('token: ', JSON.stringify(token));

            this.tx = tx;
        },

        ifo(value) {
            return dayjs(value).format('YYYY-MM-DD');
        },

        ofo(value) {
            return dayjs(value).valueOf();
        },

        revalidatePriceField() {
            // oolalaa
            this.$refs.priceField.$refs.input.$refs.input.validate();
        },

        onTokenSelected(token) {
            this.selectedPayToken = token;
        },

        onSubmit(data) {
            const { values } = data;

            console.log('price', values.price, toHex(bToTokenValue(values.price, this.selectedPayToken.priceDecimals)));
            console.log('deadline', values.deadline, parseInt(values.deadline / 1000));

            this.setTx(values);
        },

        onTransactionStatus(payload) {
            console.log('onTransactionStatus', JSON.stringify(payload));
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
