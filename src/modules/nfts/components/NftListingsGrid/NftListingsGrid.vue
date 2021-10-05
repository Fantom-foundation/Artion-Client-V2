<template>
    <div class="nftlistingsgrid">
        <f-data-grid
            ref="itemsGrid"
            no-header
            max-height="400px"
            sticky-head
            :items="listing"
            :columns="columns"
            :use-pagination="false"
            :total-items="listing.length"
        >
            <template #column-from="{ item }">
                <a :href="item.link" class="nftlistingsgrid_link">
                    <div class="nftlistingsgrid_avatar">
                        <img :src="item.img" alt="" />
                    </div>
                    {{ item.from }}
                </a>
            </template>
            <template #column-price="{ item }">
                <div class="nftlistingsgrid_price">
                    <img :src="item.imgCurrency" alt="" />
                    {{ item.price }}
                </div>
            </template>
            <template #column-buy="">
                <f-button>{{ $t('nftlistingsgrid.buy') }}</f-button>
            </template>
        </f-data-grid>
    </div>
</template>
<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import { clone } from 'fantom-vue-components/src/utils';
import { listingData } from '@/common/constants/nftlistingdata';
export default {
    name: 'NftListingsGrid',
    components: { FDataGrid },
    props: {
        listing: {
            type: Array,
            default: () => listingData(),
        },
    },
    data() {
        return {
            itemsColumns: [
                {
                    name: 'from',
                    label: 'From',
                },
                {
                    name: 'price',
                    label: 'Price',
                },
                {
                    name: 'buy',
                },
            ],
        };
    },
    computed: {
        columns() {
            const columns = clone(this.itemsColumns);
            columns[columns.length - 1].width = '73px';
            return columns;
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
