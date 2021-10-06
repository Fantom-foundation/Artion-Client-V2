<template>
    <f-listbox
        :data="collections"
        :value="typeof selected === 'string' ? [selected] : selected"
        @component-change="onListboxItemSelected"
        :aria-label="$t('collections')"
        multiselect
        prepend-selected-items
        class="collectionsfilter"
    >
        <template v-slot="{ item }">
            <div class="collectionsfilter_item tes-4">
                <f-image size="32px" :src="item.img" :alt="item.label" /> {{ item.label }}
            </div>
        </template>
    </f-listbox>
</template>

<script>
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FImage from 'fantom-vue-components/src/components/FImage/FImage.vue';
import { collectionsData } from '@/common/constants/dummy/collections-data.js';

export default {
    name: 'CollectionsFilter',

    components: { FListbox, FImage },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        /** @type {Category[]} */
        collections: {
            type: Array,
            default() {
                return collectionsData();
            },
        },
        selected: {
            type: [Array, String],
            default() {
                return [];
            },
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
