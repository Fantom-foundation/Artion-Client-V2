<template>
    <f-listbox
        :data="items"
        :per-page="perPage"
        :total-items="totalItems"
        :value="cSelected"
        :aria-label="$t('collections')"
        searchable
        strategy="remote"
        multiselect
        :throttle-input-interval="300"
        prepend-selected-items
        field-size="large"
        @component-change="onListboxItemSelected"
        @page-change="_onListboxPageChange"
        class="collectionsfilter"
    >
        <template v-slot="{ item }">
            <div class="collectionsfilter_item tes-4">
                <f-image size="32px" :src="item.img" :alt="item.label" aria-hidden="true" /> {{ item.label }}
            </div>
        </template>
    </f-listbox>
</template>

<script>
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FImage from 'fantom-vue-components/src/components/FImage/FImage.vue';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import { getCollections } from '@/modules/collections/queries/collections.js';
import { getCollectionImageUrl } from '@/utils/url.js';

export default {
    name: 'CollectionsFilter',

    components: { FListbox, FImage },

    mixins: [dataPageMixin],

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        selected: {
            type: [Array, String],
            default() {
                return [];
            },
        },
    },

    computed: {
        cSelected() {
            const { selected } = this;

            // return typeof selected === 'string' ? [selected] : selected;
            return typeof selected === 'string' ? [selected] : selected.map(item => item.value);
        },
    },

    mounted() {
        this.loadCollections();
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }) {
            return await getCollections(pagination);
        },

        async loadCollections() {
            await this._loadPage();
        },

        _getItemsFromData(data) {
            // return data.edges.map(edge => edge.node);
            return data.edges.map(edge => {
                return {
                    label: edge.node.name,
                    value: edge.node.contract,
                    img: getCollectionImageUrl(edge.node.contract),
                };
            });
        },

        onListboxItemSelected(items) {
            this.$emit(
                'change',
                // items.map(item => item)
                items
            );
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
