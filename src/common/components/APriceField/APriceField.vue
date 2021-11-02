<template>
    <div class="apricefield">
        <f-input ref="input" type="number" v-bind="$attrs" v-on="$listeners" v-model="dValue">
            <!-- copy slots -->
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>

            <template #prefix>
                <a-currency-dropdown
                    :currencies="currencies"
                    :selected="selected"
                    :select-immediately="selectImmediately"
                    :disabled="currencyDropdownDisabled"
                    @token-selected="onTokenSelected"
                />
            </template>

            <template #suffix>
                <div class="apricefield_suffix">
                    <div class="apricefield_number">{{ '$' + dollarEquivalent }}</div>
                </div>
            </template>
        </f-input>
    </div>
</template>
<script>
import ACurrencyDropdown from '@/common/components/ACurrencyDropdown/ACurrencyDropdown';

export default {
    name: 'APriceField',

    model: {
        prop: 'value',
        event: 'input',
    },

    components: { ACurrencyDropdown },

    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        /** Selected pay token address */
        selected: {
            type: String,
            default: '',
        },
        /** Fire 'token-selected' event immediately  */
        selectImmediately: {
            type: Boolean,
            default: false,
        },
        /** */
        currencyDropdownDisabled: {
            type: Boolean,
            default: false,
        },
        /** @type {PayToken[]} */
        currencies: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            factor: null,
            dValue: parseFloat(this.value),
        };
    },

    computed: {
        dollarEquivalent() {
            const m = parseFloat(this.dValue) * this.factor;

            return isNaN(m) ? '' : m.toFixed(2);
        },
    },

    watch: {
        currencies: {
            handler(value) {
                this.factor = value.length > 0 ? value[0].price : 1;
            },
            immediate: true,
        },

        value(value) {
            const val = parseFloat(value);

            if (val !== parseFloat(this.dValue)) {
                this.dValue = val;
            }
        },

        dValue(value) {
            this.$emit('change', value);
        },
    },

    methods: {
        /**
         * @param {function} [validator]
         * @return {Promise<null|*>}
         */
        async validate(validator) {
            return this.$refs.input.validate(validator);
        },

        onTokenSelected(item) {
            this.factor = item.price;
            this.$emit('token-selected', item);
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
