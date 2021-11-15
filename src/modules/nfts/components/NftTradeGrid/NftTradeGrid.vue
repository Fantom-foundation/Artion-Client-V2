<template>
    <div class="nfttradegrid">
        <f-data-grid
            no-header
            max-height="400px"
            sticky-head
            class="agrid"
            :items="items"
            :columns="itemsColumns"
            :use-pagination="false"
            :total-items="items.length"
        >
            <template #column-from="{ value }">
                <router-link :to="{ name: 'account', params: { address: value } }">
                    <a-address :address="value" />
                </router-link>
            </template>
            <template #column-to="{ value }">
                <router-link v-if="value !== null" :to="{ name: 'account', params: { address: value } }">
                    <a-address :address="value" />
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
import AAddress from '@/common/components/AAddress/AAddress.vue';
import { getTokenActivity } from '@/modules/nfts/queries/token-activity.js';
import { datetimeFormatter } from '@/utils/formatters.js';

const filter = 'LISTING_SOLD';

export default {
    name: 'NftTradeGrid',

    components: { FDataGrid, AAddress },

    data() {
        return {
            itemsColumns: [
                {
                    name: 'from',
                    label: 'From',
                },
                {
                    name: 'to',
                    label: 'To',
                },
                {
                    name: 'time',
                    label: 'Date',
                    formatter(value) {
                        return datetimeFormatter(value);
                    },
                },
            ],
            items: [],
        };
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            const routeParams = this.$route.params;
            let values = await getTokenActivity(
                routeParams.tokenContract,
                routeParams.tokenId,
                this.filterToQuery(filter)
            );
            this.items = this.transformData(values);
        },

        transformData(values) {
            return values.edges.map(item => item.node);
        },

        filterToQuery(value) {
            if (value) {
                return { filter: { types: [value] } };
            }
            return {};
        },
    },
};
</script>
