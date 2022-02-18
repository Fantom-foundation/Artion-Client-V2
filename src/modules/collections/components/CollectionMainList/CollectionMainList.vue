<template>
    <div class="collectionmainlist">
        <collection-list
            :collections="items"
            :loading="loading"
            :total-items="totalItems"
            :per-page="perPage"
            root-margin="400px 0px"
            @page-change="_onPageChange"
            @on-search="onSearch"
        />
    </div>
</template>

<script>
import CollectionList from '@/modules/collections/components/CollectionList/CollectionList.vue';
import { getCollections } from '@/modules/collections/queries/collections.js';
import { dataPageMixin } from '@/common/mixins/data-page.js';
export default {
    name: 'CollectionMainList',
    mixins: [dataPageMixin],
    components: {
        CollectionList,
    },
    data() {
        return {
            perPage: 60,
            currPage: 1,
            page: 1,
            search: '',
        };
    },
    watch: {
        loading(value) {
            this.$emit('loading', value);
        },
        search: {
            handler: function(newValue, oldValue) {
                if (newValue !== oldValue) this.loadCollections();
            },
            immediate: true,
        },
    },
    created() {
        this._ignorePageChange = false;
        this._pageInfos = {};
    },
    methods: {
        async loadPage(pagination = { first: this.perPage }, search = this.search) {
            const collections = await getCollections(pagination, search);
            const { page } = this;
            collections.edges.forEach(edge => {
                edge.node._page = page;
            });
            this.$emit('collections-count', this.totalItems);
            return collections;
        },
        async loadCollections() {
            await this._loadPage();
        },
        onSearch(value) {
            this.search = value;
        },
    },
};
</script>
