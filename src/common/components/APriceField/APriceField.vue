<template>
    <div class="apricefield">
        <f-input type="number" v-bind="$attrs" v-on="$listeners" v-model="value">
            <template #prefix>
                <a-currency-dropdown @currency-change="factor = $event" />
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
    components: { ACurrencyDropdown },
    props: {
        prices: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            factor: null,
            value: null,
        };
    },

    computed: {
        dollarEquivalent() {
            return this.value * this.factor;
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
