<template>
    <div class="accountcollectionsgrid">
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            max-height="400px"
            sticky-head
            class="agrid nfttmpgrid"
            infinite-scroll-root=".nfttmpgrid .fdatagrid_table"
            :items="items"
            :columns="columns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
        >
            <template #header>
                <div class="accountcollectionsgrid_header">
                    <f-combo-box
                        :data="filterData"
                        v-model="filter"
                        select-mode
                        readonly
                        :inline-autocomplete="false"
                        field-size="large"
                        hide-on-document-scroll
                        fit-height-to-viewport
                        class="accountactivityfilter"
                    />
                    <f-search-field
                        v-model="searchText"
                        :throttle-input-interval="400"
                        field-size="large"
                        :placeholder="$t('accountcollectionsgrid.search')"
                    />
                </div>
            </template>

            <template #column-name="{ item }">
                <div class="accountcollectionsgrid_item">
                    <f-image size="32px" :src="getCollectionImageUrl(item.contract)" :alt="item.name" /> {{ item.name }}
                </div>
            </template>
        </f-data-grid>
    </div>
</template>

<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import FImage from 'fantom-vue-components/src/components/FImage/FImage.vue';
import FSearchField from 'fantom-vue-components/src/components/FSearchField/FSearchField.vue';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import { getBannedCollections, getCollections, getCollectionsInReview } from '@/modules/nfts/queries/collections.js';
import { getCollectionImageUrl } from '@/utils/url.js';

export default {
    name: 'AccountCollectionsGrid',

    components: { FDataGrid, FImage, FSearchField },

    mixins: [dataPageMixin],

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            columns: [
                {
                    name: 'name',
                    label: this.$t('accountcollectionsgrid.name'),
                },
            ],
            searchText: '',
            filter: '__NULL__',
            filterData: [
                { value: '__NULL__', label: this.$t('accountcollectionsgrid.filterAll') },
                { value: 'inReview', label: this.$t('accountcollectionsgrid.filterInReview') },
                { value: 'banned', label: this.$t('accountcollectionsgrid.filterBanned') },
            ],
        };
    },

    watch: {
        filter: {
            handler(value, oldValue) {
                if (oldValue && value !== oldValue) {
                    this.reset();
                } else if (value) {
                    this.loadCollections();
                }
            },
            immediate: true,
        },

        searchText() {
            this.reset();
        },
    },

    methods: {
        /**
         * @param {Object} pagination
         * @return {Promise<number|string|*|undefined|null>}
         */
        async loadPage(pagination = { first: this.perPage }) {
            return await this.getQueryByFilter(this.filter, this.searchText, pagination);
        },

        async loadCollections() {
            await this._loadPage();
        },

        /**
         * @param {string} filter
         * @param {string} searchText
         * @param {Object} pagination
         * @return {Promise<number|string|*|undefined|null>}
         */
        async getQueryByFilter(filter = '__NULL__', searchText = '', pagination = {}) {
            let query = null;

            if (filter === 'inReview') {
                query = getCollectionsInReview(pagination, searchText);
            } else if (filter === 'banned') {
                query = getBannedCollections(pagination, searchText);
            } else {
                query = getCollections(pagination, searchText);
            }

            return query;
        },

        reset() {
            this._resetData();
            this.$refs.grid.goToPageNum(1);

            this.$nextTick(() => {
                this.loadCollections();
            });
        },

        getCollectionImageUrl,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
