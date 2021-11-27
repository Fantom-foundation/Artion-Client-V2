<template>
    <div class="abpricefield">
        <f-input
            ref="input"
            type="number"
            min="0"
            placeholder="0"
            validate-on-input
            :validator="validator"
            :value="dValue"
            v-bind="$attrs"
            @input="onInput"
            :aria-label="token.label"
        >
            <!-- copy slots -->
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>

            <template #top>
                <div class="abpricefield_top">
                    <span>{{ token.label }}</span>
                    <span v-if="label" class="abpricefield_label">{{ label }}</span>
                </div>
            </template>

            <template #prefix>
                <span class="abpricefield_balance abpricefield_center">
                    <span>{{ $t('abpricefield.balance') }}: {{ cBalance }}</span>
                    <f-button
                        v-if="maxBalance"
                        label="Max"
                        secondary
                        size="small"
                        class="btn-grey"
                        @click.native="onMaxButtonClick"
                    />
                </span>
            </template>

            <template #suffix>
                <div class="abpricefield_price abpricefield_center">{{ to$(dValue) }}</div>
            </template>
        </f-input>
    </div>
</template>
<script>
import { bFromTokenValue, bToTokenValue, toBigNumber } from '@/utils/big-number.js';
import { formatTokenValue } from '@/utils/formatters.js';

export default {
    name: 'ABPriceField',

    model: {
        prop: 'value',
        event: 'input',
    },

    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        /** In token decimals */
        balance: {
            type: [String, Number],
            default: '',
        },
        /** In token decimals */
        maxBalance: {
            type: [String, Number],
            default: '',
        },
        token: {
            type: Object,
            default() {
                return {
                    decimals: 18,
                    price: '',
                    priceDecimals: 6,
                    label: '',
                };
            },
        },
        label: {
            type: String,
            default: '',
        },
        validate: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            dValue: '',
            dValueMax: this.maxBalance ? this.fromTokenValue(this.maxBalance) : 0,
        };
    },

    computed: {
        cBalance() {
            return this.balance ? formatTokenValue(this.balance, this.token.decimals, 3) : 0;
        },
    },

    watch: {
        value: {
            handler(value) {
                const val = parseFloat(value);

                if (val !== parseFloat(this.dValue)) {
                    this.dValue = val;

                    this.$nextTick(() => {
                        this.$refs.input.validate();
                    });
                }
            },
            immediate: true,
        },
    },

    methods: {
        /**
         * @param {string|number} value
         * @return {string}
         */
        validator(value) {
            let errorMessage = '';

            if (!this.validate) {
                return '';
            }

            if (
                !isNaN(value) &&
                bToTokenValue(value, this.token.decimals).isGreaterThan(this.maxBalance || this.balance)
            ) {
                errorMessage = this.$t('insufficientBalance');
            }

            return errorMessage;
        },

        /**
         * @param {string|number} value
         * @return {boolean}
         */
        isValid(value) {
            return !this.validator(value);
        },

        /**
         * @param {string|number} value
         * @return {number}
         */
        fromTokenValue(value) {
            return bFromTokenValue(value, this.token.decimals).toNumber();
        },

        /**
         * @param {string|number} value
         * @return {string}
         */
        to$(value) {
            const { token } = this;
            const value$ = value ? toBigNumber(value).multipliedBy(token.price) : null;

            return formatTokenValue(value$ || 0, token.priceDecimals, 2, true);
        },

        /**
         * @param {string} value
         */
        onInput(value) {
            this.dValue = parseFloat(value);

            if (this.isValid(value)) {
                this.$emit('input', {
                    max: this.dValue === this.dValueMax,
                    value: this.dValue,
                });
            }
        },

        onMaxButtonClick() {
            this.dValueMax = this.fromTokenValue(this.maxBalance);
            this.dValue = this.dValueMax;

            if (this.isValid(this.dValue)) {
                this.$emit('input', {
                    max: true,
                    value: this.dValueMax,
                });
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
