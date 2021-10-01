<template>
    <f-listbox
        :data="cStatuses"
        :value="typeof selected === 'string' ? [selected] : selected"
        @component-change="onListboxItemSelected"
        :aria-label="$t('status')"
        multiselect
        class="statusesfilter"
    >
        <template v-slot="{ item }">
            <div class="statusesfilter_item tes-4">
                {{ $t(item.label) }}
            </div>
        </template>
    </f-listbox>
</template>

<script>
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import { STATUSES } from '@/common/constants/statuses.js';

export default {
    name: 'StatusFilter',

    components: { FListbox },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        /** @type {Status[]} */
        statuses: {
            type: Array,
            default() {
                return STATUSES();
            },
        },
        selected: {
            type: [Array, String],
            default() {
                return [];
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
        onListboxItemSelected(items) {
            this.$emit(
                'change',
                items.map(item => item.value)
            );
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
