<template>
    <div class="nftdirectoffersgrid">
        <f-data-grid
            no-header
            max-height="400px"
            sticky-head
            class="agrid"
            :items="offers"
            :columns="itemsColumns"
            :use-pagination="false"
            :total-items="offers.length"
        >
            <template #column-from="{ item }">
                <a :href="item.link" class="agrid_link">
                    <div class="agrid_avatar">
                        <img :src="item.img" alt="" />
                    </div>
                    {{ item.from }}
                </a>
            </template>
            <template #column-price="{ item }">
                <div class="agrid_price">
                    <img :src="item.imgCurrency" alt="" />
                    {{ item.price }}
                </div>
            </template>
            <template #column-expiration="{ item }">
                <div>
                    {{ item.expiration }}
                </div>
            </template>
        </f-data-grid>
    </div>
</template>
<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import { OFFERS } from '@/common/constants/dummy/nftOffers.js';
export default {
    name: 'NftDirectOffersGrid',
    components: { FDataGrid },
    props: {
        offers: {
            type: Array,
            default: () => OFFERS(),
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
                    name: 'expiration',
                    label: 'Expiration',
                },
            ],
            // items: [
            //     {
            //         from: '0x0d0c',
            //         expiration: 'in 12 hours',
            //         img: '/img/tmp/owner-avatar.png',
            //         link: 'someLink',
            //         price: 5000,
            //         imgCurrency: '/img/tmp/ftm.png',
            //     },
            //     {
            //         from: '0x0d0c',
            //         expiration: 'in 12 hours',
            //         link: 'someLink',
            //         img: '/img/tmp/owner-avatar.png',
            //         price: 5000,
            //         imgCurrency: '/img/tmp/ftm.png',
            //     },
            // ],
        };
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
