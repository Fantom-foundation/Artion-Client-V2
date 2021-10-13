<template>
    <div class="apricefield">
        <f-input type="number" v-bind="$attrs" v-on="$listeners" v-model="dValue">
            <template #prefix>
                <a-currency-dropdown :currencies="currencies" @token-selected="factor = $event.price" />
            </template>
            <template #suffix>
                <div class="apricefield_suffix">
                    <div class="apricefield_number">
                        {{ '$' + dollarEquivalent }}
                    </div>
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

            return isNaN(m) ? '' : m;
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
            this.dValue = parseFloat(value);
        },

        dValue(value) {
            this.$emit('change', value);
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
