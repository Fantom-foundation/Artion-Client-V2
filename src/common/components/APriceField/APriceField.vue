<template>
    <div class="apricefield">
        <f-input ref="input" type="number" v-bind="$attrs" v-on="$listeners" v-model="dValue">
            <template #prefix>
                <a-currency-dropdown :currencies="currencies" @token-selected="onTokenSelected" />
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
        event: 'change',
    },

    components: { ACurrencyDropdown },

    props: {
        value: {
            type: [String, Number],
            default: '',
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
            console.log('dVAlue change');
            this.$emit('change', value);
        },
    },

    methods: {
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
