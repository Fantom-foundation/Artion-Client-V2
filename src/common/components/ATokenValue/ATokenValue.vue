<template>
    <span class="atokenvalue">
        <a-placeholder
            v-if="usePlaceholder"
            :content-loaded="!!dToken.label || contentLoaded"
            :replacement-text="replacementText"
        >
            <img v-if="dToken.img" :src="dToken.img" :alt="tokenSymbol" />
            <span class="atokenvalue_value">
                {{ tokenValue }}
            </span>
            <span v-if="!noSymbol" class="atokenvalue_symbol">{{ tokenSymbol }}</span>
            <span v-if="withPrice" class="atokenvalue_price">({{ tokenPrice$ }})</span>
        </a-placeholder>

        <template v-else>
            <img v-if="dToken.img" :src="dToken.img" :alt="tokenSymbol" />
            <span class="atokenvalue_value">
                {{ tokenValue }}
            </span>
            <span v-if="!noSymbol" class="currency">{{ tokenSymbol }}</span>
            <span v-if="withPrice" class="atokenvalue_price">({{ tokenPrice$ }})</span>
        </template>
    </span>
</template>

<script>
import { PAY_TOKENS } from '@/common/constants/pay-tokens.js';
import { formatTokenValue } from '@/utils/formatters.js';
import { toBigNumber } from '@/utils/big-number.js';

const payTokens = PAY_TOKENS();

export default {
    name: 'ATokenValue',

    props: {
        /** Pay token address or token itself */
        token: {
            type: [String, Object],
            default: '',
            // required: true,
        },
        /** Token's value. */
        value: {
            type: [Number, String],
            default: 0,
        },
        /** Hide symbol */
        isPayToken: {
            type: Boolean,
            default: true,
        },
        /** Hide symbol */
        noSymbol: {
            type: Boolean,
            default: false,
        },
        /** Show price in $ */
        withPrice: {
            type: Boolean,
            default: false,
        },
        /** Use APlaceholder. */
        usePlaceholder: {
            type: Boolean,
            default: true,
        },
        /** Determines whether the content is loaded or not. */
        contentLoaded: {
            type: Boolean,
            default: false,
        },
        /** Replacement text for FPlaceholder. */
        replacementText: {
            type: String,
            default: '10,000.00 wFTM',
        },
        /** Currency symbol used in `formatNumberByLocale` function */
        numberCurrency: {
            type: String,
            default: '',
        },
        /** Number of fraction digits */
        fractionDigits: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            dToken: {
                label: '',
                decimals: 18,
            },
        };
    },

    computed: {
        tokenValue() {
            const { value } = this;

            if (typeof value === 'string' && value.indexOf('0x') === 0) {
                return formatTokenValue(value, this.dToken.decimals, this.fractionDigits);
            }

            return value;
        },

        tokenSymbol() {
            return this.dToken.label;
        },

        tokenPrice$() {
            const { value } = this;
            const { dToken } = this;
            const value$ = value ? toBigNumber(value).multipliedBy(dToken.price) : null;

            return value$ ? formatTokenValue(value$, dToken.priceDecimals, 2, true) : '';
        },
    },

    watch: {
        token: {
            handler(value) {
                if (value) {
                    if (typeof value === 'string') {
                        this.dToken = this.getPayTokenByAddress(value);
                    } else {
                        this.dToken = value;
                    }
                }
            },
            immediate: true,
        },
    },

    methods: {
        getPayTokenByAddress(address) {
            return payTokens.find(token => token.address === address);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
