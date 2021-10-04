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
            <template #column-price="{ item }">
                <div class="agrid_price">
                    <img :src="item.imgCurrency" alt="" />
                    {{ item.price }}
                </div>
            </template>
            <template #column-from="{ item }">
                <a :href="item.link" class="agrid_link">
                    <div class="agrid_avatar">
                        <img :src="item.img" alt="" />
                    </div>
                    {{ item.from }}
                </a>
            </template>
            <template #column-to="{ item }">
                <a :href="item.link" class="agrid_link">
                    <div class="agrid_avatar">
                        <img :src="item.img" alt="" />
                    </div>
                    {{ item.to }}
                </a>
            </template>
            <template #column-date="{ item }">
                <div>
                    {{ item.date }}
                </div>
            </template>
        </f-data-grid>
    </div>
</template>
<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
export default {
    name: 'NftHistoryGrid',

    components: { FDataGrid },

    data() {
        return {
            itemsColumns: [
                {
                    name: 'price',
                    label: 'Price',
                },
                {
                    name: 'from',
                    label: 'From',
                },
                {
                    name: 'to',
                    label: 'To',
                },
                {
                    name: 'date',
                    label: 'Date',
                },
            ],
            items: [
                {
                    from: '0x0d0c',
                    to: 'cccccc',
                    date: '10 Days Ago',
                    img: '/img/tmp/owner-avatar.png',
                    link: 'someLink',
                    price: 5000,
                    imgCurrency: '/img/tmp/ftm.png',
                },
                {
                    from: '0x0d0c',
                    to: 'cccccc',
                    date: '10 Days Ago',
                    link: 'someLink',
                    img: '/img/tmp/owner-avatar.png',
                    price: 5000,
                    imgCurrency: '/img/tmp/ftm.png',
                },
            ],
        };
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
