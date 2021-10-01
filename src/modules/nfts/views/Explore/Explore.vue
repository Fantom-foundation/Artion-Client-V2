<template>
    <div class="explore">
        <div class="explore_sidebar">
            <div class="h3">Filters</div>
            <nft-filters v-model="filters" />
        </div>
        <div>
            <nft-list />
        </div>
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

<style lang="scss">
@use "style";
</style>
