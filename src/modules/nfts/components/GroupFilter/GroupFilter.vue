<template>
    <f-combo-box
        :data="data"
        v-model="group"
        select-mode
        readonly
        :inline-autocomplete="false"
        field-size="large"
        class="groupfilter"
    />
</template>

<script>
import FComboBox from 'fantom-vue-components/src/components/FComboBox/FComboBox.vue';
import { GROUP_FILTERS } from '@/common/constants/group-filter.js';

export default {
    name: 'GroupFilter',

    components: { FComboBox },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        selected: {
            type: String,
            default: 'all',
        },
    },

    data() {
        return {
            data: GROUP_FILTERS().map(group => {
                return { label: this.$t(group.label), value: group.value, disabled: group.disabled };
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
