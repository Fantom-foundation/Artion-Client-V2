<template>
    <div class="pg-bid-form">
        <div class="pg-bid-form__current-bid" :class="{ 'pg-bid-form__current-bid--mb-0': !!currentBid }">
            {{ $t('pgBidForm.currentBid') }}: {{ formatNumberByLocale(currentBid) }} wFTM
        </div>
        <div class="pg-bid-form__min-next-bid" v-if="currentBid">
            {{ $t('pgBidForm.minNextBid') }}: {{ formatNumberByLocale(currentBid + minBidAmount) }} wFTM
        </div>
        <div class="pg-bid-form__my-bid">
            <a-currency-dropdown :currencies="currencies" @token-selected="factor = $event.price"></a-currency-dropdown>
            <input
                class="pg-bid-form__amount"
                :class="{ 'pg-bid-form__amount--zero': !amount, 'pg-bid-form__amount--error': error }"
                type="number"
                v-model="amount"
            />
            <div v-if="error" class="pg-bid-form__error">{{ error }}</div>
        </div>
        <div class="pg-bid-form__info">
            <div class="pg-bid-form__balance">
                <span class="pg-bid-form__balance-text"> {{ $t('pgBidForm.balance') }}:</span>
                {{ formatNumberByLocale(userBalance, 3) }} wFTM
            </div>
            <div class="pg-bid-form__bid-value-fiat">~{{ to$(userBalanceH) }}</div>
        </div>

        <div class="pg-bid-form__input-box">
            <input
                class="pg-bid-form__amount"
                :class="{ 'pg-bid-form__amount--zero': !amount, 'pg-bid-form__amount--error': error }"
                type="number"
                v-model="amount"
            />
            <div class="pg-bid-form__bid-value-fiat">~{{ to$(amount) }}</div>
        </div>

        <div class="pg-bid-form__terms-and-conditions">
            <f-option type="checkbox" option-size="small" name="terms" @change="termAndConditionsAgreed = $event">
                <label>
                    {{ $t('pgBidForm.termsAndConditionsAgreement') }}
                    <router-link :to="{ path: '/pg' }">{{ $t('pgBidForm.termsAndConditionsLink') }}</router-link>
                </label>
            </f-option>
        </div>
        <div class="flex juc-center">
            <span class="pg-bid-form__button" @click="placeBid">
                <a-button
                    size="large"
                    :loading="txStatus.status === 'pending'"
                    :label="$t('pgBidForm.placeBid')"
                    :disabled="!amount || !termAndConditionsAgreed || !!error"
                />
            </span>
        </div>

        <a-sign-transaction :tx="tx" />
    </div>
</template>

<script>
import { getWFTMToken } from '@/modules/pg/utils.js';
import ACurrencyDropdown from '../../../../common/components/ACurrencyDropdown/ACurrencyDropdown';
import { getErc20TokenBalance } from '@/modules/wallet/queries/erc20-token-balance.js';
import { bFromTokenValue, bToTokenValue, toBigNumber, toHex } from '@/utils/big-number.js';
import { formatNumberByLocale, formatTokenValue } from '@/utils/formatters.js';
import { mapState } from 'vuex';
import AButton from '@/common/components/AButton/AButton.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';

export default {
    name: 'PGBidForm',

    components: {
        ASignTransaction,
        AButton,
        ACurrencyDropdown,
    },

    props: {
        /** Auction object */
        auction: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            currencies: [],
            factor: null,
            token: null,
            amount: 0.0,
            currentBid: 0,
            currentBidH: '',
            minBidAmount: 0,
            minBidAmountH: '',
            termAndConditionsAgreed: false,
            userBalance: 0,
            userBalanceH: '',
            payToken: null,
            error: null,
            tx: {},
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        ...mapState('app', {
            txStatus: 'txStatus',
        }),
    },

    watch: {
        amount() {
            const parsedAmount = Number(this.amount);

            if (Number.isNaN(parsedAmount)) {
                this.error = this.$t('pgBidForm.mustBeNumber');
                return false;
            }
            if (parsedAmount > this.userBalance) {
                this.error = this.$t('pgBidForm.insufficientBalance');
                return false;
            }
            if (parsedAmount < this.currentBid) {
                this.error = this.$t('pgBidForm.newBidIsBelowCurrent');
                return false;
            }
            if (parsedAmount < this.minBidAmount + this.currentBid) {
                this.error = this.$t('pgBidForm.newBidIsBelowMin');
                return false;
            }
            /*if (parsedAmount % this.minBidAmount !== 0) {
                this.error = this.$t('pgBidForm.bidMustBeDivisibleByHundred', { amount: this.minBidAmount });
                return false;
            }*/

            this.error = null;
        },

        auction(value) {
            this.setData(value);
            // this.currentBid = bFromTokenValue(value.lastBid, this.payToken.priceDecimals);
        },

        walletAddress() {
            this.updateUserBalance();
            // this.walletConnected = !!value;
        },
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            this.payToken = await getWFTMToken();
            this.currencies = [this.payToken];

            console.log('au', this.auction);

            this.setData(this.auction);
            await this.updateUserBalance();
        },

        setData(auction) {
            this.minBidAmountH = auction.minBidAmount;
            this.minBidAmount = this.fromWeiToNumber(auction.minBidAmount);

            this.currentBidH = auction.lastBid || '0x0';
            this.currentBid = this.fromWeiToNumber(auction.lastBid ? auction.lastBid : this.minBidAmountH);
        },

        async setTx() {
            const web3 = new Web3();
            const { auction } = this;
            const amount = toHex(bToTokenValue(this.amount + 0.000001, this.payToken.decimals));

            console.log('AMOUNT3:', this.amount, amount, this.minBidAmount, this.currentBid);

            const tx = contracts.placeAuctionBid(auction.contract, auction.tokenId, amount, web3);

            console.log('tx: ', tx);

            this.tx = tx;
        },

        placeBid() {
            this.setTx();
        },

        async updateUserBalance() {
            this.userBalanceH = await getErc20TokenBalance(this.walletAddress, this.payToken.address);
            this.userBalance = bFromTokenValue(this.userBalanceH, this.payToken.priceDecimals).toNumber();
        },

        fromWeiToNumber(value) {
            return bFromTokenValue(value, this.payToken.decimals).toNumber();
        },

        to$(value) {
            const value$ = value ? toBigNumber(value).multipliedBy(this.payToken.price) : null;

            return value$ ? formatTokenValue(value$, this.payToken.priceDecimals, 2, true) : '';
        },

        formatNumberByLocale,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
