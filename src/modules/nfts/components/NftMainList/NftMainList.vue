<template>
    <div class="nftmainList">
        <nft-list
            ref="nftList"
            :tokens="items"
            :loading="loading"
            :total-items="totalItems"
            :per-page="perPage"
            :has-next-page="hasNextPage"
            :curr-page="currPage"
            :density="density"
            root-margin="400px 0px"
            @page-change="onPageChange"
            @nft-list-page="onNftListPage"
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
import { mapState } from 'vuex';
import { clone, isObjectEmpty, objectEquals } from 'fantom-vue-components/src/utils';

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
    },

    data() {
        return {
            perPage: 20,
            currPage: 1,
            page: 1,
        };
    },

    computed: {
        ...mapState('app', {
            density: 'nftsDensity',
        }),
    },

    watch: {
        filters(value, oldValue) {
            if (!objectEquals(value, oldValue) || this.items.length === 0) {
                this._resetData();

                this.$nextTick(() => {
                    const { meta } = this.$route;
                    let pagination = null;

                    if (meta.backButton && meta?.prevRoute?.name === 'nft-detail' && meta.NftMainList) {
                        pagination = meta.NftMainList.lastVariables;

                        this.hasNextPage = meta.NftMainList.pageInfo.hasNextPage;
                        this.currPage = meta.NftMainList.currPage;
                        this.page = this.currPage;
                        this.totalItems = parseInt(meta.NftMainList.totalItems);

                        this.pageInfo = clone(meta.NftMainList.pageInfo);
                        this.pageInfoPrev = clone(meta.NftMainList.pageInfo);
                        this._pageInfos[this.page] = clone(meta.NftMainList);

                        delete meta.NftMainList;

                        this._ignorePageChange = this.page !== 1;
                    } else {
                        this.$refs.nftList.goToPageNum(1);
                    }

                    this.loadTokens(pagination);
                });
            }
        },

        loading(value) {
            this.$emit('loading', value);
        },
    },

    created() {
        this._ignorePageChange = false;
        this._pageInfos = {};
    },

    methods: {
        async loadPage(
            pagination = { first: this.perPage },
            filterSort = filtersToQueryFilters(this.filters, getDefaultFilters())
        ) {
            const tokens = await getTokens(pagination, filterSort);
            const { page } = this;

            tokens.edges.forEach(edge => {
                edge.node._page = page;
            });

            this.$emit('tokens-count', this.totalItems);

            return tokens;
        },

        async loadTokens(pagination) {
            await this._loadPage({
                pagination: pagination || undefined,
                filterSort: filtersToQueryFilters(this.filters, getDefaultFilters()),
            });

            this.$emit('tokens-count', this.totalItems);
        },

        onNftListPage(page) {
            this.$route.meta.NftMainList = clone(this._pageInfos[page]);
        },

        async onPageChange(pagination) {
            if (this._ignorePageChange) {
                this._ignorePageChange = false;
                return;
            }

            this.page = pagination.currPage;

            await this._onPageChange(pagination);

            let pageInfo = {};

            if (this._usePageInfoPrev && !isObjectEmpty(this.pageInfoPrev)) {
                pageInfo = this.pageInfoPrev;
            } else {
                pageInfo = this.pageInfo;
            }

            this._pageInfos[this.page] = {
                pageInfo: clone(pageInfo),
                lastVariables: { ...pageInfo.lastVariables },
                currPage: pagination.currPage,
                totalItems: this.totalItems,
            };
        },
    },
};
</script>

<style scoped></style>
