<template>
    <div class="pg-bid-form">
        <div class="pg-bid-form__current-bid" :class="{ 'pg-bid-form__current-bid--mb-0': !!currentBid }">
            {{ $t('pgBidForm.currentBid') }}: {{ currentBid.toLocaleString('en-US') }} wFTM
        </div>
        <div class="pg-bid-form__min-next-bid" v-if="currentBid">
            {{ $t('pgBidForm.minNextBid') }}: {{ (currentBid + 100).toLocaleString('en-US') }} wFTM
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
            <div class="pg-bid-form__bid-value-fiat">
                ~$0
            </div>
        </div>

        <div class="pg-bid-form__input-box">
            <input
                class="pg-bid-form__amount"
                :class="{ 'pg-bid-form__amount--zero': !amount, 'pg-bid-form__amount--error': error }"
                type="number"
                v-model="amount"
            />
            <div class="pg-bid-form__bid-value-fiat">
                ~$0
            </div>
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
            <span v-if="true" class="pg-bid-form__button" @click="placeBid">
                <f-button
                    size="large"
                    :label="$t('pgBidForm.placeBid')"
                    :disabled="!amount || !termAndConditionsAgreed || !!error"
                />
            </span>
        </div>
    </div>
</template>

<script>
import { getWFTMToken } from '@/modules/pg/utils.js';
import ACurrencyDropdown from '../../../../common/components/ACurrencyDropdown/ACurrencyDropdown';
import { getErc20TokenBalance } from '@/modules/wallet/queries/erc20-token-balance.js';
import { bFromTokenValue } from '@/utils/big-number.js';
import { formatNumberByLocale } from '@/utils/formatters.js';
import { mapState } from 'vuex';

export default {
    name: 'PGBidForm',

    components: {
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
            currentBid: 15000,
            termAndConditionsAgreed: false,
            userBalance: 0,
            payToken: null,
            error: null,
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        amount() {
            const parsedAmount = Number(this.amount);

            if (Number.isNaN(parsedAmount)) {
                this.error = this.$t('pgBidForm.mustBeNumber');
                return false;
            }
            if (parsedAmount < this.currentBid) {
                this.error = this.$t('pgBidForm.newBidIsBelowCurrent');
                return false;
            }
            if (parsedAmount % 100 !== 0) {
                this.error = this.$t('pgBidForm.bidMustBeDivisibleByHundred');
                return false;
            }

            this.error = null;
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

            await this.updateUserBalance();
        },

        placeBid() {
            console.log('Place Bid');
        },

        async updateUserBalance() {
            const balance = await getErc20TokenBalance(this.walletAddress, this.payToken.address);
            this.userBalance = bFromTokenValue(balance, this.payToken.priceDecimals).toNumber();
        },

        formatNumberByLocale,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
