<template>
    <div class="accountcollectionsgrid">
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            sticky-head
            class="agrid nfttmpgrid"
            __max-height="400px"
            __infinite-scroll-root=".nfttmpgrid .fdatagrid_table"
            :caption="$t('page.accountCollections.title')"
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
                        no-label
                        :aria-label="$t('accountcollectionsgrid.filter')"
                    />
                    <f-search-field
                        v-model="searchText"
                        :throttle-input-interval="400"
                        field-size="large"
                        :placeholder="$t('accountcollectionsgrid.search')"
                        no-label
                        :aria-label="$t('accountcollectionsgrid.search')"
                    />
                </div>
            </template>

            <template #column-name="{ item }">
                <router-link
                    :to="{ name: 'explore', query: { collections: item.contract } }"
                    class="accountcollectionsgrid_item"
                >
                    <f-image
                        size="70px"
                        :src="getCollectionImageUrl(item.contract)"
                        :alt="item.name"
                        aria-hidden="true"
                    />
                    {{ item.name }}
                </router-link>
            </template>
            <template #column-social="{ item }">
                <social :info="item" />
            </template>
            <template #column-ownerUser="{ value }">
                <router-link :to="{ name: 'account', params: { address: value.address } }">
                    <a-address :address="value.address" :name="value.username" :image="value.avatarThumb" is-account />
                </router-link>
            </template>
            <template #column-contract="{ value }">
                <a :href="`https://ftmscan.com/address/${value}`" target="_blank">
                    <f-ellipsis :text="value" overflow="middle" />
                </a>
            </template>
            <template #column-royalty="{ value }"> {{ value }}% </template>
            <template #column-feeRecipientUser="{ value }">
                <router-link :to="{ name: 'account', params: { address: value.address } }">
                    <a-address :address="value.address" :name="value.username" :image="value.avatarThumb" is-account />
                </router-link>
            </template>

            <template #column-actions="{ item }">
                <a-button
                    v-if="filter === '__NULL__'"
                    :loading="item._loading"
                    :disabled="item._disabled"
                    @click.native="onBanButtonClick(item)"
                >
                    <app-iconset icon="ban" size="16px" /> {{ $t('accountcollectionsgrid.ban.button') }}
                </a-button>
                <a-button
                    v-if="filter === 'banned'"
                    :loading="item._loading"
                    :disabled="item._disabled"
                    @click.native="onUnbanButtonClick(item)"
                >
                    <app-iconset icon="thumb-up" size="16px" /> {{ $t('accountcollectionsgrid.unban.button') }}
                </a-button>
                <template v-else-if="filter === 'inReview'">
                    <a-button
                        :loading="item._loading"
                        :disabled="item._disabled"
                        @click.native="onApproveButtonClick(item)"
                    >
                        <app-iconset icon="thumb-up" size="16px" /> {{ $t('accountcollectionsgrid.approve.button') }}
                    </a-button>
                    <a-button
                        :loading="item._loading"
                        :disabled="item._disabled"
                        @click.native="onDeclineButtonClick(item)"
                    >
                        <app-iconset icon="thumb-down" size="16px" /> {{ $t('accountcollectionsgrid.decline.button') }}
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
    getCollectionsMod,
    getCollectionsInReview,
} from '@/modules/collections/queries/collections.js';
import { getCollectionImageUrl } from '@/utils/url.js';
import AButton from '@/common/components/AButton/AButton.vue';
import { banCollection, unbanCollection } from '@/modules/collections/mutations/ban-unban.js';
import { approveCollection, declineCollection } from '@/modules/collections/mutations/approve-decline.js';
import AAddress from '@/common/components/AAddress/AAddress';
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis';
import Social from '@/modules/nfts/components/SocialLinks/SocialLinks';

export default {
    name: 'AccountCollectionsGrid',

    components: { Social, AButton, FDataGrid, FImage, FSearchField, AAddress, FEllipsis },

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
                    width: '250px',
                },
                {
                    name: 'ownerUser',
                    label: this.$t('accountcollectionsgrid.owner'),
                    width: '200px',
                },
                {
                    name: 'description',
                    label: this.$t('accountcollectionsgrid.description'),
                    width: '300px',
                },
                {
                    name: 'social',
                    label: this.$t('accountcollectionsgrid.social'),
                    width: '180px',
                },
                {
                    name: 'royalty',
                    label: this.$t('accountcollectionsgrid.royalty'),
                    width: '80px',
                },
                {
                    name: 'feeRecipientUser',
                    label: this.$t('accountcollectionsgrid.feeRecipient'),
                    width: '200px',
                },
                {
                    name: 'contract',
                    label: this.$t('accountcollectionsgrid.contract'),
                    width: '150px',
                },
                {
                    name: 'actions',
                    label: this.$t('accountcollectionsgrid.actions'),
                },
            ],
            searchText: '',
            filter: 'enabled',
            filterData: [
                { value: 'enabled', label: this.$t('accountcollectionsgrid.filterEnabled') },
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
            return await this.getCollectionsByFilter(this.filter, this.searchText, pagination);
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
        async getCollectionsByFilter(filter, searchText = '', pagination = {}) {
            let collections = null;

            if (filter === 'inReview') {
                collections = getCollectionsInReview(pagination, searchText);
            } else if (filter === 'banned') {
                collections = getBannedCollections(pagination, searchText);
            } else {
                collections = getCollectionsMod(pagination, searchText);
            }

            return collections;
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
         * @param {string} message
         * @return {Promise<void>}
         */
        async action(mutation, collection, message) {
            if (confirm(this.$t('accountcollectionsgrid.' + message + '.confirm', collection))) {
                this.updateGridRow({ ...collection, _loading: true });

                try {
                    const ok = await mutation(collection.contract);

                    this.updateGridRow({ ...collection, _loading: false });

                    if (ok) {
                        this.$notifications.add({
                            type: 'success',
                            text: this.$t('accountcollectionsgrid.' + message + '.success'),
                        });
                        this.removeGridRow(collection.contract);
                    }
                } catch (error) {
                    this.updateGridRow({ ...collection, _loading: false });
                    console.error(error);
                }
            }
        },

        /**
         * @param {Collection} collection
         */
        onBanButtonClick(collection) {
            this.action(banCollection, collection, 'ban');
        },

        /**
         * @param {Collection} collection
         */
        onUnbanButtonClick(collection) {
            this.action(unbanCollection, collection, 'unban');
        },

        /**
         * @param {Collection} collection
         */
        onApproveButtonClick(collection) {
            this.action(approveCollection, collection, 'approve');
        },

        /**
         * @param {Collection} collection
         */
        onDeclineButtonClick(collection) {
            this.action(declineCollection, collection, 'decline');
        },

        getCollectionImageUrl,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
