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
import { getTokenOffers } from '@/modules/nfts/queries/token-offers.js';
import dayjs from 'dayjs';

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

    created() {
        // this.init();
    },

    methods: {
        async init() {
            const items = await getTokenOffers('0x61af4d29f672e27a097291f72fc571304bc93521', '0x1e9c');

            console.log('offers: ', items);

            console.log(dayjs(items.edges[0].node.created).format('DD.MM.YYYY HH:mm'));
            console.log(dayjs(items.edges[0].node.deadline).format('DD.MM.YYYY HH:mm'));
            console.log(dayjs(items.edges[0].node.closed).format('DD.MM.YYYY HH:mm'));
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
