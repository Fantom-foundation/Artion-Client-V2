<template>
    <div class="explore">
        <div class="sidebar">
            Filters
            <nft-filters v-model="filters" />
        </div>
        <nft-list />
    </div>
</template>

<script>
import NftList from '@/modules/nfts/components/NftList/NftList';
import NftFilters from '@/modules/nfts/components/NftFilters/NftFilters.vue';
import { routeQueryMixin } from '@/common/mixins/route-query.js';

export default {
    name: 'Explore',

    mixins: [routeQueryMixin('filters')],

    components: { NftFilters, NftList },

    data() {
        return {
            filters: {},
        };
    },
};
</script>

<style>
.explore {
    display: grid;
    grid-template-columns: 280px 1fr;
}
</style>
