<template>
    <div class="nftmainList">
        <nft-list
            :tokens="items"
            :loading="loading"
            :total-items="totalItems"
            :per-page="perPage"
            :density="density"
            root-margin="400px 0px"
            @page-change="_onPageChange"
        />
    </div>
</template>

<script>
import NftList from '@/modules/nfts/components/NftList/NftList.vue';
// import { getCollections } from '@/modules/nfts/queries/collections.js';
// import { getCollectionTokens } from '@/modules/nfts/queries/collection-tokens.js';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import { getTokens } from '@/modules/nfts/queries/tokens.js';
import { filtersToQueryFilters, getDefaultFilters } from '@/modules/nfts/filters.js';

export default {
    name: 'NftMainList',

    components: { NftList },

    mixins: [dataPageMixin],

    props: {
        filters: {
            type: Object,
            default() {
                return {};
            },
        },
        density: {
            type: [Number, String],
            default: 280,
        },
    },

    data() {
        return {
            perPage: 20,
        };
    },

    watch: {
        filters() {
            this.loadTokens();
        },

        loading(value) {
            this.$emit('loading', value);
        },
    },

    created() {
        this.loadTokens();
    },

    methods: {
        async loadPage(
            pagination = { first: this.perPage },
            filterSort = filtersToQueryFilters(this.filters, getDefaultFilters())
        ) {
            const tokens = await getTokens(pagination, filterSort);

            this.$emit('tokens-count', this.totalItems);

            return tokens;
        },

        async loadTokens() {
            await this._loadPage({
                filterSort: filtersToQueryFilters(this.filters, getDefaultFilters()),
            });

            this.$emit('tokens-count', this.totalItems);
        },
    },
};
</script>

<style scoped></style>
