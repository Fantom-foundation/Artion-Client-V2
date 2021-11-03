<template>
    <f-form class="nftbidform grid gapr-9" v-model="values" @submit="onSubmit">
        <f-form-input
            ref="priceField"
            type="a-price-field"
            :currencies="payTokens"
            :selected="auction.payToken"
            :select-immediately="true"
            currency-dropdown-disabled
            name="price"
            :label="$t('nftbidform.price')"
            :validator="priceValidator"
            validate-on-input
            @token-selected="onTokenSelected"
        />

        <div class="fform_buttons">
            <a-button type="submit" size="large" :loading="txStatus === 'pending'">
                {{ $t('nftbidform.place') }}
            </a-button>
        </div>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </f-form>
</template>
<script>
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import { bToTokenValue, toBigNumber, toHex } from '@/utils/big-number.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import AButton from '@/common/components/AButton/AButton.vue';
import { getUserAllowanceTx, getUserBalance } from '@/plugins/wallet/utils.js';
import { mapState } from 'vuex';

export default {
    name: 'NftBidForm',

    components: { AButton, ASignTransaction },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        auction: {
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
            payToken: {},
            tx: {},
            txStatus: '',
            userBalanceB: null,
            minBidAmountB: null,
            currentBidB: null,
            priceB: null,
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        isFormValid() {
            return !this.priceValidator(this.values.price);
        },
    },

    watch: {
        auction: {
            handler(value) {
                if (value.contract) {
                    this.setData(value);
                }
            },
            immediate: true,
        },

        walletAddress() {
            this.setUserBalance();
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
        async placeBid(values) {
            let priceB = bToTokenValue(values.price, this.payToken.decimals);

            if (priceB.isLessThan(this.minBidAmountB)) {
                priceB = this.minBidAmountB;
            }

            const allowanceTx = await getUserAllowanceTx({
                value: toHex(priceB),
                tokenAddress: this.auction.payToken,
                contract: process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
            });

            if (allowanceTx) {
                allowanceTx._code = 'place_bid_allowance';

                this.tx = allowanceTx;

                this.priceB = priceB;
            } else {
                this.setPlaceBidTx(priceB);
            }
        },

        /**
         * @param {BigNumber} priceB
         */
        setPlaceBidTx(priceB) {
            const web3 = new Web3();
            const { token } = this;

            const tx = contracts.placeAuctionBid(token.contract, token.tokenId, toHex(priceB), web3);

            tx._code = 'place_bid';

            this.tx = tx;
        },

        /**
         * @param {Auction} auction
         */
        setData(auction) {
            this.minBidAmountB = toBigNumber(auction.minBidAmount);
            this.currentBidB = toBigNumber(auction.lastBid || '0x0');
            this.setUserBalance();
        },

        async setUserBalance() {
            this.userBalanceB = await getUserBalance(this.auction.payToken, this.walletAddress);
        },

        /**
         * @param {string} value
         * @return {VueI18n.TranslateResult|string}
         */
        priceValidator(value) {
            const val = parseFloat(value);
            const valB = bToTokenValue(val, this.payToken.decimals);
            let msg = '';

            if (isNaN(val) || val <= 0) {
                msg = this.$t('nftbidform.nonZeroPrice');
            } else if (valB.isGreaterThan(this.userBalanceB)) {
                msg = this.$t('nftbidform.insufficientTokenBalance', { token: this.payToken.label });
            } else if (valB.isLessThan(this.minBidAmountB)) {
                if (this.currentBidB.isEqualTo(0)) {
                    msg = this.$t('nftbidform.newBidIsBelowMin');
                } else {
                    msg = this.$t('nftbidform.newBidIsBelowCurrent');
                }
            }

            return msg;
        },

        /**
         * @param {PayToken} token
         */
        onTokenSelected(token) {
            this.payToken = token;
        },

        /**
         * @param {Object} data
         */
        onSubmit(data) {
            this.placeBid(data.values);
        },

        onTxSuccess() {
            this.priceB = null;
            this.$notifications.add({
                type: 'success',
                text: this.$t('nftbidform.placeBidSuccessful'),
            });
            this.$emit('tx-success');
        },

        /**
         * @param {TransactionStatus} payload
         */
        onTransactionStatus(payload) {
            const txCode = payload.code;
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                if (txCode === 'place_bid_allowance') {
                    this.setPlaceBidTx(this.priceB);
                } else if (txCode === 'place_bid') {
                    this.onTxSuccess();
                }
            }

            this.$emit('transaction-status', payload);
        },
    },
};
</script>
