<template>
    <div class="explore">
        <div class="explore_sidebar">
            <div class="h3">Filters</div>
            <nft-filters v-model="filters" />
        </div>
        <div>
            <div class="explore_nftlist_header">
                <div class="co-grey-5">5 results</div>
                <div class="explore_nftlist_header_endcol">
                    <nft-list-filters v-model="filters" />
                    <density-switch @density-switch="density = $event" />
                </div>
            </div>
            <nft-list :density="density" />
        </div>
    </div>
</template>

<script>
import NftList from '@/modules/nfts/components/NftList/NftList';
import NftFilters from '@/modules/nfts/components/NftFilters/NftFilters.vue';
import DensitySwitch from '@/modules/nfts/components/DensitySwitch/DensitySwitch.vue';
import { routeQueryMixin } from '@/common/mixins/route-query.js';
import NftListFilters from '@/modules/nfts/components/NftListFilters/NftListFilters.vue';

export default {
    name: 'Explore',

    mixins: [routeQueryMixin('filters')],

    components: { NftListFilters, NftFilters, NftList, DensitySwitch },

    data() {
        return {
            filters: {},
            density: 280,
        };
    },
};
</script>

<style lang="scss">
@use "style";
</style>
