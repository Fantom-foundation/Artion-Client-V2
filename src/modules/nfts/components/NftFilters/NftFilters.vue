<template>
    <a-details-group class="nftfilters">
        <a-details :label="$t('status')" :open="'status' in filters" id="test_nftfilters_status">
            <status-filter v-model="dFilters.status" />
        </a-details>
        <a-details :label="$t('collections')" :open="'collections' in filters" id="test_nftfilters_collections">
            <collections-filter :collections="collections" v-model="dFilters.collections" />
        </a-details>
        <a-details :label="$t('categories')" :open="'category' in filters" id="test_nftfilters_categories">
            <categories-filter :categories="categories" v-model="dFilters.category" />
        </a-details>
    </a-details-group>
</template>

<script>
import { clone } from 'fantom-vue-components/src/utils';
import ADetailsGroup from '@/common/components/ADetailsGroup/ADetailsGroup.vue';
import ADetails from '@/common/components/ADetails/ADetails.vue';
import CategoriesFilter from '@/modules/nfts/components/CategoriesFilter/CategoriesFilter.vue';
import CollectionsFilter from '@/modules/nfts/components/CollectionsFilter/CollectionsFilter.vue';
import StatusFilter from '@/modules/nfts/components/StatusFilter/StatusFilter.vue';

import { getCategories } from '@/modules/nfts/queries/categories.js';
import { getCollections } from '@/modules/nfts/queries/collections.js';

export default {
    name: 'NftFilters',

    components: { StatusFilter, CollectionsFilter, CategoriesFilter, ADetails, ADetailsGroup },

    model: {
        prop: 'filters',
        event: 'change',
    },

    props: {
        filters: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    watch: {
        dFilters: {
            handler(value) {
                if (!this._dontEmitChange) {
                    this.$emit('change', clone(value));
                }
            },
            deep: true,
        },

        filters(value) {
            this._dontEmitChange = true;

            this.dFilters = { ...value };

            this.$nextTick(() => {
                this._dontEmitChange = false;
            });
        },
    },

    data() {
        return {
            dFilters: { ...this.filters },
            categories: [],
            collections: [],
        };
    },

    created() {
        this.init();
        this._dontEmitChange = false;
    },

    methods: {
        async init() {
            this.categories = await getCategories();
            let collections = await getCollections();
            this.collections = collections.edges.map(edge => {
                return {
                    label: edge.node.name,
                    value: edge.node.contract,
                    img: 'https://cloudflare-ipfs.com/ipfs/QmP8idjiQxFZ1Wpe61fSmi6jPTT48apPEx4QVKDhhWNWya',
                };
            });
        },
    },
};
</script>
