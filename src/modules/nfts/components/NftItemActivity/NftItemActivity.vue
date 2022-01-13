<template>
    <div class="nftitemactivity">
        <NftItemActivityFilter v-model="filters" />
        <NftItemActivityFilterChips v-model="filters" />
        <f-data-grid
            ref="grid"
            infinite-scroll
            infinite-scroll-root=".nfttmpgrid .fdatagrid_table"
            strategy="remote"
            no-header
            max-height="400px"
            sticky-head
            class="agrid"
            :items="items"
            :columns="itemsColumns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
        >
            <template #column-unitPrice="{ item, value }">
                <a-token-value
                    :token="item.payToken"
                    :value="value"
                    :fraction-digits="2"
                    :use-placeholder="false"
                    no-symbol
                />
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
                <div>
                    {{ value }}
                </div>
            </template>
        </f-data-grid>
    </div>
</template>
<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import { getTokenActivity } from '@/modules/nfts/queries/token-activity.js';
import { datetimeFormatter } from '@/utils/formatters.js';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import { objectEquals } from 'fantom-vue-components/src/utils';

import NftItemActivityFilter from '@/modules/nfts/components/NftItemActivityFilter/NftItemActivityFilter.vue';
import NftItemActivityFilterChips from '@/modules/nfts/components/NftItemActivityFilterChips/NftItemActivityFilterChips.vue';
import { ACTIVITY_TYPES } from '@/common/constants/activity-type-filters.js';

export default {
    name: 'NftItemActivity',

    components: { FDataGrid, AAddress, ATokenValue, NftItemActivityFilter, NftItemActivityFilterChips },

    mixins: [dataPageMixin],

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        const _this = this;
        return {
            filters: {},
            itemsColumns: [
                {
                    name: 'type',
                    label: this.$t('nfthistorygrid.event'),
                    formatter(value) {
                        return _this.$t('nfthistorygrid.types.' + value);
                    },
                },
                {
                    name: 'unitPrice',
                    label: this.$t('nfthistorygrid.price'),
                },
                {
                    name: 'fromUser',
                    label: this.$t('nfthistorygrid.from'),
                },
                {
                    name: 'toUser',
                    label: this.$t('nfthistorygrid.to'),
                },
                {
                    name: 'time',
                    label: this.$t('nfthistorygrid.date'),
                    formatter(value) {
                        return datetimeFormatter(value);
                    },
                },
            ],
            perPage: 40,
        };
    },

    computed: {
        dFilters() {
            return Object.values(this.filters)
                .flat()
                .map(item => item.filter);
        },
    },

    watch: {
        token: {
            async handler(value, oldValue) {
                if (value.contract && !objectEquals(value, oldValue)) {
                    if (this.items.length > 0) {
                        this.update();
                    } else {
                        await this.loadActivities();
                    }
                }
            },
            immediate: true,
        },
        dFilters() {
            this.update();
        },
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }) {
            const { token } = this;
            let filters = this.dFilters;

            // if no filter is picked
            if (filters.length === 0) {
                // show Sales and Transfers by default
                const defaultFilter = /SOLD|RESOLVED|TRANSFER|MINT|BURN/;
                filters = ACTIVITY_TYPES()
                    .map(activity => activity.filter)
                    .filter(activity => defaultFilter.test(activity));
            }

            return await getTokenActivity(token.contract, token.tokenId, pagination, this.filterToQuery(filters));
        },

        async loadActivities() {
            await this._loadPage();
        },

        filterToQuery(value) {
            if (value) {
                return { filter: { types: value } };
            }
            return {};
        },

        update() {
            setTimeout(() => {
                this._resetData();
                this.$refs.grid.reload();
            }, 50);
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
