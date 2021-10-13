<template>
    <f-combo-box
        :data="data"
        v-model="group"
        select-mode
        readonly
        :inline-autocomplete="false"
        field-size="large"
        class="sortbyfilter"
    />
</template>

<script>
import FComboBox from 'fantom-vue-components/src/components/FComboBox/FComboBox.vue';
import { SORT_BY_FILTERS } from '@/common/constants/sort-by-filters.js';

export default {
    name: 'SortByFilter',

    components: { FComboBox },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        selected: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            data: SORT_BY_FILTERS().map(sortby => {
                return { label: this.$t(sortby.label), value: sortby.value, disabled: sortby.disabled };
            }),
            group: this.selected,
        };
    },

    watch: {
        group(value) {
            this.$emit('change', value);
        },

        selected(value) {
            this.group = value;
        },
    },
};
</script>

<style scoped></style>
