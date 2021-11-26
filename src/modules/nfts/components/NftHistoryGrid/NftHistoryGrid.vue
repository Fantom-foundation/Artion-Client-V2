<template>
    <div class="nfthistorygrid">
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

const filter = ['LISTING_SOLD', 'OFFER_SOLD', 'AUCTION_RESOLVED'];

export default {
    name: 'NftHistoryGrid',

    components: { FDataGrid, AAddress, ATokenValue },

    data() {
        return {
            itemsColumns: [
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
                return { filter: { types: value } };
            }
            return {};
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
