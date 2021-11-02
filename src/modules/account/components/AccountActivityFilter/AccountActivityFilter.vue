<template>
    <f-combo-box
        :data="data"
        v-model="group"
        select-mode
        readonly
        :inline-autocomplete="false"
        field-size="large"
        class="accountactivityfilter"
    />
</template>

<script>
import FComboBox from 'fantom-vue-components/src/components/FComboBox/FComboBox.vue';
import { ACTIVITY_TYPES } from '@/common/constants/activity-type-filters.js';

export default {
    name: 'AccountActivityFilter',

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
            data: ACTIVITY_TYPES().map(type => {
                return { label: this.$t(type.label), value: type.filter, disabled: type.disabled };
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
