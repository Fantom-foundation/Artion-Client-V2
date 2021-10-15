<template>
    <div class="explore">
        <div class="explore_sidebar">
            <div class="h3">Filters</div>
            <nft-filters v-model="filters" />
        </div>
        <div>
            <div class="explore_nftlist_header">
                <div class="co-grey-5">
                    <a-placeholder block :content-loaded="results > -1" replacement-text="1000 results">
                        {{ results }} {{ $t('results') }}
                    </a-placeholder>
                </div>
                <div class="explore_nftlist_header_endcol">
                    <nft-list-filters v-model="filters" />
                    <density-switch />
                </div>
            </div>
            <nft-filter-chips v-model="filters" />
            <nft-main-list
                :filters="filters"
                :density="density"
                @tokens-count="onTokensCount"
                @loading="onNftMainListLoading"
            />
        </div>
    </div>
</template>

<script>
import NftFilters from '@/modules/nfts/components/NftFilters/NftFilters.vue';
import DensitySwitch from '@/modules/nfts/components/DensitySwitch/DensitySwitch.vue';
import { routeQueryMixin } from '@/common/mixins/route-query.js';
import NftListFilters from '@/modules/nfts/components/NftListFilters/NftListFilters.vue';
import NftFilterChips from '@/modules/nfts/components/NftFilterChips/NftFilterChips.vue';
import NftMainList from '@/modules/nfts/components/NftMainList/NftMainList.vue';
import { mapState } from 'vuex';

export default {
    name: 'Explore',

    mixins: [routeQueryMixin('filters')],

    components: { NftMainList, NftFilterChips, NftListFilters, NftFilters, DensitySwitch },

    data() {
        return {
            filters: {},
            results: -1,
            labels: {},
        };
    },

    computed: {
        ...mapState('app', {
            density: 'nftsDensity',
        }),
    },

    methods: {
        onTokensCount(count) {
            this.results = count;
        },

        onNftMainListLoading(loading) {
            if (loading) {
                this.results = -1;
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
