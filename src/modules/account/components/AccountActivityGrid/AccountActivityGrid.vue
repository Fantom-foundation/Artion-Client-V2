<template>
    <div class="accountactivitylist">
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            no-header
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
            <template #column-type="{ value }">
                {{ chooseActivityType(value) }}
            </template>
            <template #column-token="{ item }">
                <router-link
                    :to="{ name: 'nft-detail', params: { tokenContract: item.contract, tokenId: item.tokenId } }"
                >
                    <a-address
                        :owner="{
                            address: item.token.contract,
                            username: item.token.name,
                            avatarThumb: item.token.imageThumb,
                        }"
                    />
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
            <template #column-from="{ value }">
                <router-link :to="{ name: 'account', params: { address: value } }">
                    <a-address :address="value" />
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
import { ACTIVITY_TYPES } from '@/common/constants/activity-type-filters.js';
import { datetimeFormatter } from '@/utils/formatters.js';
import { defer, objectEquals } from 'fantom-vue-components/src/utils';

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
        filter: {
            type: String,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            columns: [
                {
                    name: 'type',
                    label: this.$t('accountactivitylist.event'),
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
                    name: 'from',
                    label: this.$t('accountactivitylist.owner'),
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

        filter() {
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
                filterSort: this.filterToQuery(this.filter),
            });
        },

        filterToQuery(value) {
            if (value) {
                return { filter: { types: [value] } };
            }
            return {};
        },

        transformQty(value) {
            if (!value) return '';
            return toInt(value);
        },

        update() {
            this._resetData();
            this.$refs.grid.goToPageNum(1);
        },

        chooseActivityType(value) {
            const types = ACTIVITY_TYPES();
            let type = types.find(item => item.filter === value);
            return this.$t(type.label);
        },

        async _onGridPageChange(pagination) {
            this.loading = true;

            console.log('_onGridPageChange', JSON.stringify(pagination));
            console.log('this.pageInfo', JSON.stringify(this.pageInfo));

            const data = await this._loadPage({
                pagination: this._getPaginationVariables(pagination),
                filterSort: this.filterToQuery(this.filter),
                dontSetItems: true,
            });

            // if (this.pageInfo.hasNextPage && data.edges && data.edges.length > 0) {
            if (data.edges && data.edges.length > 0) {
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
