<template>
    <div class="pg-bid-form">
        <div class="pg-bid-form__current-bid" :class="{ 'pg-bid-form__current-bid--mb-0': true }">
            {{ $t('pgBidForm.currentBid') }}: {{ formatNumberByLocale(currentBid, decimals) }} wFTM
        </div>
        <div class="pg-bid-form__min-next-bid">
            {{ $t('pgBidForm.minNextBid') }}: {{ formatTokenValue(minNextBidB, payToken.decimals, decimals) }} wFTM
        </div>
        <div class="pg-bid-form__my-bid">
            <a-currency-dropdown
                :currencies="currencies"
                :disabled="txStatus === 'pending'"
                @token-selected="factor = $event.price"
            ></a-currency-dropdown>
            <input
                class="pg-bid-form__amount"
                :class="{ 'pg-bid-form__amount--zero': !amount, 'pg-bid-form__amount--error': error }"
                :disabled="txStatus === 'pending'"
                type="number"
                v-model="amount"
            />
            <div v-if="error" class="pg-bid-form__error">{{ error }}</div>
        </div>
        <div class="pg-bid-form__info">
            <div class="pg-bid-form__balance">
                <span class="pg-bid-form__balance-text"> {{ $t('pgBidForm.balance') }}:</span>
                {{ formatTokenValue(userBalanceB, payToken.decimals, decimals) }} wFTM
            </div>
            <div class="pg-bid-form__bid-value-fiat">~{{ to$(userBalanceB) }}</div>
        </div>

        <div class="pg-bid-form__input-box">
            <input
                ref="amountInput"
                class="pg-bid-form__amount"
                :class="{ 'pg-bid-form__amount--zero': !amount, 'pg-bid-form__amount--error': error }"
                type="number"
                :disabled="txStatus === 'pending'"
                v-model="amount"
            />
            <div class="pg-bid-form__bid-value-fiat">~{{ to$(amount) }}</div>
        </div>

        <div class="pg-bid-form__terms-and-conditions">
            <f-option
                type="checkbox"
                option-size="small"
                name="terms"
                :disabled="txStatus === 'pending'"
                @change="termAndConditionsAgreed = $event"
            >
                {{ $t('pgBidForm.termsAndConditionsAgreement') }}
                <!--                    <router-link :to="{ path: '/pg' }">{{ $t('pgBidForm.termsAndConditionsLink') }}</router-link>-->
                <a href="https://gasly.artion.io/terms/Artion-Terms-v2.2-8-Oct-2021.pdf" target="_blank">
                    {{ $t('pgBidForm.termsAndConditionsLink') }}
                </a>
            </f-option>
        </div>
        <div class="flex juc-center">
            <span class="pg-bid-form__button">
                <a-button
                    size="large"
                    :loading="txStatus === 'pending'"
                    :label="$t('pgBidForm.placeBid')"
                    :disabled="!amount || !termAndConditionsAgreed || !!error"
                    @click.native="onPlaceBid"
                />
            </span>
        </div>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
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
import erc20Utils from '@/utils/erc20-utils.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import { getErc20TokenAllowance } from '@/modules/wallet/queries/erc20-token-allowance.js';

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
            currentBidB: null,
            minBidAmount: 0,
            minBidAmountB: null,
            termAndConditionsAgreed: false,
            userBalanceB: null,
            userAllowanceB: null,
            payToken: {},
            error: null,
            minIncrement: 50,
            decimals: 2,
            tx: {},
            txStatus: '',
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        minNextBidB() {
            if (!this.minBidAmountB || !this.payToken.decimals) {
                return toBigNumber(0);
            }

            if (this.currentBid === 0) {
                return this.minBidAmountB;
            }

            // console.log('---', this.fromWeiToNumber(this.minBidAmountB), this.minIncrement, this.currentBid);
            // const minIncrementB = bToTokenValue(this.minIncrement, this.payToken.decimals);

            // return this.minBidAmountB.plus(minIncrementB);

            return bToTokenValue(this.fromWeiToNumber(this.minBidAmountB) + this.minIncrement, this.payToken.decimals);
        },
    },

    watch: {
        amount() {
            const parsedAmount = Number(this.amount);
            const parsedAmountB = bToTokenValue(this.amount, this.payToken.decimals);

            /*console.log(1
                'arr',
                parsedAmountB.toNumber(),
                this.userBalanceB.toNumber(),
                parsedAmountB.isLessThan(this.userBalanceB)
            );*/

            if (Number.isNaN(parsedAmount)) {
                this.error = this.$t('pgBidForm.mustBeNumber');
                return false;
            }
            if (parsedAmountB.isGreaterThan(this.userBalanceB)) {
                this.error = this.$t('pgBidForm.insufficientBalance');
                return false;
            }
            if (parsedAmount < this.currentBid) {
                this.error = this.$t('pgBidForm.newBidIsBelowCurrent');
                return false;
            }
            if (parsedAmountB.isLessThan(this.minNextBidB)) {
                this.error = this.$t('pgBidForm.newBidIsBelowMin');
                return false;
            }
            /*if (parsedAmount < this.minBidAmount + this.currentBid) {
                this.error = this.$t('pgBidForm.newBidIsBelowMin');
                return false;
            }*/
            /*console.log(parsedAmount, this.minBidAmount, this.minBidAmountB);
            if (parsedAmount % this.minBidAmount !== 0) {
                this.error = this.$t('pgBidForm.bidMustBeDivisibleByHundred', { amount: this.minBidAmount });
                return false;
            }*/

            this.error = null;
        },

        auction(value) {
            this.setData(value);
            // this.currentBid = bFromTokenValue(value.lastBid, this.payToken.decimals);
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

            this.amount = parseInt(bFromTokenValue(this.minNextBidB, this.payToken.decimals).toNumber());
        },

        setData(auction) {
            this.minBidAmountB = toBigNumber(auction.minBidAmount);
            this.minBidAmount = this.fromWeiToNumber(auction.minBidAmount);

            this.currentBidB = toBigNumber(auction.lastBid || '0x0');
            this.currentBid = this.fromWeiToNumber(this.currentBidB);
            // this.currentBid = this.fromWeiToNumber(auction.lastBid ? auction.lastBid : this.minBidAmountB);
        },

        async setTx(_amountB) {
            const web3 = new Web3();
            const { auction } = this;
            let amountB = _amountB || bToTokenValue(this.amount, this.payToken.decimals);

            // console.log('AMOUNT3:', _amountB, this.amount, toHex(amountB), this.minBidAmount, this.currentBid);
            if (amountB.isLessThan(this.minBidAmountB)) {
                amountB = this.minBidAmountB;
            } else {
                /*console.log(
                    '@@@@@@@@@@@@@@@@@@',
                    amountB.toString(10),
                    this.minBidAmountB.toString(10),
                    this.userAllowanceB.toString(10)
                );*/
                amountB = amountB.plus(2);
            }

            // console.log('FINAL', amountB.toString(10));

            const tx = contracts.placeAuctionBid(auction.contract, auction.tokenId, toHex(amountB), web3);

            tx._code = 'bid';

            this.tx = tx;
        },

        setAllowanceTx(_amountB) {
            let amountB = _amountB;

            if (amountB.isLessThan(this.minBidAmountB)) {
                amountB = this.minBidAmountB;
            }

            console.log('INCREASE ALLOWANCE', amountB.plus(10).toString(10));

            const tx = erc20Utils.erc20IncreaseAllowanceTx(
                this.payToken.address,
                process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS,
                toHex(amountB.plus(10))
            );

            tx._code = 'allowance';

            // console.log('setALL', amountB.plus(10).toString());
            this.tx = tx;
        },

        async updateUserBalance() {
            this.userBalanceB = toBigNumber(await getErc20TokenBalance(this.walletAddress, this.payToken.address));

            this.userAllowanceB = toBigNumber(
                await getErc20TokenAllowance(
                    this.walletAddress,
                    this.payToken.address,
                    process.env.VUE_APP_FANTOM_AUCTION_CONTRACT_ADDRESS
                )
            );

            console.log('this.userAllowanceB', this.userAllowanceB.toNumber());
        },

        fromWeiToNumber(value) {
            return bFromTokenValue(value, this.payToken.decimals).toNumber();
        },

        to$(value) {
            const value$ = value ? toBigNumber(value).multipliedBy(this.payToken.price) : null;

            return value$ ? formatTokenValue(value$, this.payToken.priceDecimals, 2, true) : '';
        },

        onPlaceBid() {
            const amountB = bToTokenValue(this.amount, this.payToken.decimals);

            if (amountB.isGreaterThan(this.userAllowanceB)) {
                this.setAllowanceTx(amountB.minus(this.userAllowanceB));
            } else {
                this.setTx(amountB);
            }
        },

        onTransactionStatus(payload) {
            const txCode = payload.code;
            this.txStatus = payload.status;

            this.$emit('transaction-status', payload);

            if (this.txStatus === 'success') {
                if (txCode === 'allowance') {
                    this.setTx();
                } else if (txCode === 'bid') {
                    this.$emit('successful-bid');
                }
            }
        },

        formatNumberByLocale,
        formatTokenValue,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
