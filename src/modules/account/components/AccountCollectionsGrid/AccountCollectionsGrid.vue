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
                <router-link
                    :to="{ name: 'explore', query: { collections: item.contract } }"
                    class="accountcollectionsgrid_item"
                >
                    <f-image size="32px" :src="getCollectionImageUrl(item.contract)" :alt="item.name" /> {{ item.name }}
                </router-link>
            </template>

            <template #column-actions="{ item }">
                <a-button
                    v-if="filter === '__NULL__'"
                    :loading="item._loading"
                    :disabled="item._disabled"
                    @click.native="onBanButtonClick(item)"
                >
                    <app-iconset icon="ban" size="16px" /> {{ $t('accountcollectionsgrid.ban') }}
                </a-button>
                <a-button
                    v-if="filter === 'banned'"
                    :loading="item._loading"
                    :disabled="item._disabled"
                    @click.native="onUnbanButtonClick(item)"
                >
                    <app-iconset icon="thumb-up" size="16px" /> {{ $t('accountcollectionsgrid.unban') }}
                </a-button>
                <template v-else-if="filter === 'inReview'">
                    <a-button
                        :loading="item._loading"
                        :disabled="item._disabled"
                        @click.native="onApproveButtonClick(item)"
                    >
                        <app-iconset icon="thumb-up" size="16px" /> {{ $t('accountcollectionsgrid.approve') }}
                    </a-button>
                    <a-button
                        :loading="item._loading"
                        :disabled="item._disabled"
                        @click.native="onDeclineButtonClick(item)"
                    >
                        <app-iconset icon="thumb-down" size="16px" /> {{ $t('accountcollectionsgrid.decline') }}
                    </a-button>
                </template>
            </template>
        </f-data-grid>
    </div>
</template>

<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import FImage from 'fantom-vue-components/src/components/FImage/FImage.vue';
import FSearchField from 'fantom-vue-components/src/components/FSearchField/FSearchField.vue';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import {
    getBannedCollections,
    getCollections,
    getCollectionsInReview,
} from '@/modules/collections/queries/collections.js';
import { getCollectionImageUrl } from '@/utils/url.js';
import AButton from '@/common/components/AButton/AButton.vue';
import { banCollection, unbanCollection } from '@/modules/collections/mutations/ban-unban.js';
import { approveCollection, declineCollection } from '@/modules/collections/mutations/approve-decline.js';

export default {
    name: 'AccountCollectionsGrid',

    components: { AButton, FDataGrid, FImage, FSearchField },

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
                    width: '360px',
                },
                {
                    name: 'actions',
                    label: this.$t('accountcollectionsgrid.actions'),
                },
            ],
            searchText: '',
            filter: '__NULL__',
            filterData: [
                { value: '__NULL__', label: this.$t('accountcollectionsgrid.filterAll') },
                { value: 'banned', label: this.$t('accountcollectionsgrid.filterBanned') },
                { value: 'inReview', label: this.$t('accountcollectionsgrid.filterInReview') },
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

        /**
         * @param {Collection} collection
         */
        updateGridRow(collection) {
            this.$refs.grid.updateRowBy(collection, collection.contract, 'contract');
        },

        /**
         * @param {string} contract
         */
        removeGridRow(contract) {
            this.$refs.grid.removeRowBy(contract, 'contract');
        },

        /**
         * @param {function} mutation Has to return promise
         * @param {Collection} collection
         * @param {string} successMessage
         * @return {Promise<void>}
         */
        async action(mutation, collection, successMessage) {
            this.updateGridRow({ ...collection, _loading: true });

            try {
                const ok = await mutation(collection.contract);

                this.updateGridRow({ ...collection, _loading: false });

                if (ok) {
                    this.$notifications.add({
                        type: 'success',
                        text: successMessage,
                    });
                    this.removeGridRow(collection.contract);
                }
            } catch (error) {
                this.updateGridRow({ ...collection, _loading: false });
                console.error(error);
            }
        },

        /**
         * @param {Collection} collection
         */
        onBanButtonClick(collection) {
            this.action(banCollection, collection, this.$t('accountcollectionsgrid.banSuccess'));
        },

        /**
         * @param {Collection} collection
         */
        onUnbanButtonClick(collection) {
            this.action(unbanCollection, collection, this.$t('accountcollectionsgrid.unbanSuccess'));
        },

        /**
         * @param {Collection} collection
         */
        onApproveButtonClick(collection) {
            this.action(approveCollection, collection, this.$t('accountcollectionsgrid.approveSuccess'));
        },

        /**
         * @param {Collection} collection
         */
        onDeclineButtonClick(collection) {
            this.action(declineCollection, collection, this.$t('accountcollectionsgrid.declineSuccess'));
        },

        getCollectionImageUrl,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
