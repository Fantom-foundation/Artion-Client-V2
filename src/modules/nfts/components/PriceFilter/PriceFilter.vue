<template>
    <div>
        <f-input ref="input" type="number" :value="priceRange[0]" @input="onMinChange"/>
        <f-input ref="input" type="number" :value="priceRange[1]" @input="onMaxChange"/>
    </div>
</template>

<script>
import FInput from 'fantom-vue-components/src/components/FInput/FInput';

export default {
    name: 'PriceFilter',

    components: { FInput },

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

    computed: {
        cStatuses() {
            return this.statuses.map(status => {
                return { label: status.label, value: status.id };
            });
        },
    },

    methods: {
        onMinChange(min) {
            this.$emit(
                'change',
                [min, this.priceRange[1]]
            );
        },
        onMaxChange(max) {
            this.$emit(
                'change',
                [this.priceRange[0], max]
            );
        },
    },
};
</script>
