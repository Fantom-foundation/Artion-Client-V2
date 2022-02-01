<template>
    <f-combo-box
        :data="data"
        v-model="group"
        select-mode
        readonly
        :inline-autocomplete="false"
        :aria-label="$t('nftlistfilters.groupFilters')"
        field-size="large"
        class="groupfilter"
    />
</template>

<script>
import FComboBox from 'fantom-vue-components/src/components/FComboBox/FComboBox.vue';
import { GROUP_FILTERS } from '@/common/constants/group-filter.js';
import { isArray } from 'fantom-vue-components/src/utils/array.js';

export default {
    name: 'GroupFilter',

    components: { FComboBox },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        selected: {
            type: [String, Array],
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
            if (isArray(value)) {
                this.group = value[0];
            } else {
                this.group = value;
            }
        },
    },
};
</script>

<style scoped></style>
