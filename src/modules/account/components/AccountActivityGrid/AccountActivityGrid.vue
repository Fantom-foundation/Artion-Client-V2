<template>
    <div class="accountactivitylist">
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            no-header
            sticky-head
            __max-height="400px"
            __infinite-scroll-root=".nfttmpgrid .fdatagrid_table"
            class="agrid nfttmpgrid"
            :caption="$t('page.accountActivity.title')"
            :items="items"
            :columns="columns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
        >
            <template #column-token="{ item }">
                <router-link
                    v-if="item.token"
                    :to="{ name: 'nft-detail', params: { tokenContract: item.contract, tokenId: item.tokenId } }"
                >
                    <a-address :address="item.token.contract" :name="item.token.name" :image="item.token.imageThumb" />
                </router-link>
            </template>
            <template #column-unitPrice="{ item, value }">
                <a-token-value
                    :token="item.payToken"
                    :value="value"
                    :fraction-digits="2"
                    :use-placeholder="false"
                    no-symbol
                />
            </template>
            <template #column-quantity="{ value }">
                {{ transformQty(value) }}
            </template>
            <template #column-fromUser="{ value }">
                <router-link :to="{ name: 'account', params: { address: value.address } }">
                    <a-address :address="value.address" :name="value.username" :image="value.avatarThumb" is-account />
                </router-link>
            </template>
            <template #column-toUser="{ value }">
                <router-link v-if="value !== null" :to="{ name: 'account', params: { address: value.address } }">
                    <a-address :address="value.address" :name="value.username" :image="value.avatarThumb" is-account />
                </router-link>
            </template>
            <template #column-time="{ value }">
                {{ value }}
            </template>
        </f-data-grid>
    </div>
</template>

<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import { getUserActivity } from '@/modules/account/queries/user-activity.js';
import { toInt } from '@/utils/big-number.js';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import { datetimeFormatter } from '@/utils/formatters.js';
import { defer, objectEquals } from 'fantom-vue-components/src/utils';
import { ITEM_ACTIVITY_FILTER_OPTIONS } from '@/modules/nfts/components/NftItemActivityFilter/filter-options.js';

export default {
    name: 'AccountActivityGrid',

    components: { FDataGrid, AAddress, ATokenValue },

    mixins: [dataPageMixin],

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
        filters: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        let _this = this;
        return {
            columns: [
                {
                    name: 'type',
                    label: this.$t('accountactivitylist.event'),
                    formatter(value) {
                        return _this.$t('nfthistorygrid.types.' + value);
                    },
                },
                {
                    name: 'token',
                    label: this.$t('accountactivitylist.item'),
                },
                {
                    name: 'unitPrice',
                    label: this.$t('accountactivitylist.price'),
                },
                {
                    name: 'quantity',
                    label: this.$t('accountactivitylist.qty'),
                },
                {
                    name: 'fromUser',
                    label: this.$t('accountactivitylist.from'),
                },
                {
                    name: 'toUser',
                    label: this.$t('accountactivitylist.to'),
                },
                {
                    name: 'time',
                    label: this.$t('accountactivitylist.date'),
                    formatter(value) {
                        return datetimeFormatter(value);
                    },
                },
            ],
        };
    },

    watch: {
        userAddress: {
            handler(value) {
                if (value) {
                    this.loadActivities();
                } else {
                    this.loading = true;
                }
            },
            immediate: true,
        },

        filters() {
            this.update();
            this.loadActivities();
        },

        loading(value) {
            this.$emit('loading', value);
        },
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }, filterSort = {}) {
            return await getUserActivity(this.userAddress, pagination, filterSort);
        },

        async loadActivities() {
            await this._loadPage({
                filterSort: this.filterToQuery(this.filters),
            });
        },

        filterToQuery(filters) {
            if (filters.length > 0) {
                const filterOptions = ITEM_ACTIVITY_FILTER_OPTIONS();
                const filteredTypes = this.filters
                    .map(value => {
                        const filterOption = filterOptions.find(option => option.value === value);
                        let filters = [];

                        if (filterOption) {
                            filters = filterOption.filters;
                        }

                        return filters;
                    })
                    .flat();

                return { filter: { types: filteredTypes } };
            } else {
                // show all by default
                return { filter: {} };
            }
        },

        transformQty(value) {
            if (!value) return '';
            return toInt(value);
        },

        update() {
            this._resetData();
            this.$refs.grid.goToPageNum(1);
        },

        async _onGridPageChange(pagination) {
            this.loading = true;

            const data = await this._loadPage({
                pagination: this._getPaginationVariables(pagination),
                filterSort: this.filterToQuery(this.filters),
                dontSetItems: true,
            });

            // if (this.pageInfo.hasNextPage && data.edges && data.edges.length > 0) {
            if (data && data.edges && data.edges.length > 0) {
                const items = this._getItemsFromData(data);

                if (!objectEquals(this.items, this._getItemsFromData(data))) {
                    this.items = items;
                }

                defer(() => {
                    this.loading = false;
                });
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
