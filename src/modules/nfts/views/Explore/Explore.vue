<template>
    <div class="explore" :class="{ no_aside: isSideClose }">
        <div class="explore_sidebar" :class="{ close: isSideClose }">
            <div class="h3 explore_sidebar_wrap">
                <button
                    :aria-label="$t('page.explore.filters')"
                    :data-tooltip="$t('page.explore.filters')"
                    @click="isSideClose = !isSideClose"
                >
                    <span class="explore_sidebar_label">{{ $t('page.explore.filters') }}</span>
                    <span class="explore_sidebar_icon"><app-iconset icon="arrowright" size="24px"/></span>
                </button>
            </div>
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
        <div class="explore_filterButton">
            <f-button @click.native="isSideClose = !isSideClose">
                {{ $t('page.explore.filters') }}
                <span v-if="filterNumber" class="explore_filterButton_counter">{{ filterNumber }}</span>
            </f-button>
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
import { isArray } from 'fantom-vue-components/src/utils';
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
            isSideClose: false,
        };
    },

    created() {
        if (document.body.clientWidth <= 600) this.isSideClose = true;
    },

    computed: {
        ...mapState('app', {
            density: 'nftsDensity',
        }),

        filterNumber() {
            let counter = 0;
            let values = Object.values(this.filters);
            values.forEach(item => {
                if (isArray(item) && item.length) counter += item.length;
                else counter += 1;
            });

            return counter;
        },
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
