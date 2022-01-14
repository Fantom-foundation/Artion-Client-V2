<template>
    <f-form v-model="values" @submit="onSubmit" class="pricefilter">
        <div class="pricefilter_inputs">
            <f-form-input
                name="price1"
                type="number"
                validate-on-input
                :validator="price1Validator"
                :placeholder="$t('pricefilter.min')"
                min="0"
                no-label
                :aria-label="$t('pricefilter.minimalPrice')"
            >
                <template #suffix><span class="pricefilter_currency">$</span></template>
            </f-form-input>

            <span>{{ $t('pricefilter.to') }}</span>

            <f-form-input
                name="price2"
                type="number"
                validate-on-input
                :validator="price2Validator"
                :placeholder="$t('pricefilter.max')"
                min="0"
                no-label
                :aria-label="$t('pricefilter.maximalPrice')"
            >
                <template #suffix><span class="pricefilter_currency">$</span></template>
            </f-form-input>
        </div>
        <div class="tea-center">
            <f-message v-if="errorMsg" type="error" alert>{{ errorMsg }}</f-message>
            <f-button type="submit" secondary :label="$t('pricefilter.apply')" />
        </div>
    </f-form>
</template>

<script>
import FMessage from 'fantom-vue-components/src/components/FMessage/FMessage.vue';

export default {
    name: 'PriceFilter',

    components: { FMessage },

    model: {
        prop: 'priceRange',
        event: 'change',
    },

    props: {
        priceRange: {
            type: Array,
            default() {
                return [null, null]; // [min, max]
            },
        },
    },

    data() {
        return {
            values: {
                price1: null,
                price2: null,
            },
            errorMsg: '',
        };
    },

    computed: {
        cStatuses() {
            return this.statuses.map(status => {
                return { label: status.label, value: status.id };
            });
        },
    },

    watch: {
        priceRange: {
            handler(value) {
                this.values = {
                    price1: value[0] || null,
                    price2: value[1] || null,
                };
            },
            immediate: true,
        },
    },

    methods: {
        /**
         * @param {string} price1
         */
        price1Validator(price1) {
            this.validate({
                price1,
                price2: this.values.price2,
            });
        },

        /**
         * @param {string} price2
         */
        price2Validator(price2) {
            this.validate({
                price1: this.values.price1,
                price2,
            });
        },

        /**
         * @param {{price1: string|null, price2: string|null}} values
         * @return {[number|null, number|null]|false}
         */
        validate(values) {
            const prices = [null, null];
            const price1 = parseFloat(values.price1);
            const price2 = parseFloat(values.price2);

            this.errorMsg = '';

            if (isNaN(price1) && isNaN(price2)) {
                // this.errorMsg = 'Fill a value';
                return false;
            } else if (price1 < 0 || price2 < 0) {
                this.errorMsg = this.$t('pricefilter.negativePriceError');
                return false;
            } else if (!isNaN(price1) && !isNaN(price2) && price1 > price2) {
                this.errorMsg = this.$t('pricefilter.minimumPriceError');
                return false;
            } else {
                prices[0] = price1;
                prices[1] = price2;
            }

            return prices;
        },

        /**
         * @param {Object} data
         */
        onSubmit(data) {
            const { values } = data;
            let prices = this.validate(values);

            if (prices) {
                this.$emit('change', prices);
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
