<template>
    <div class="explore" :class="{ no_aside: isSideClose }">
        <h1 class="not-visible" data-focus>{{ $t('page.explore.title') }}</h1>

        <div class="explore_sidebar" :class="{ close: isSideClose }">
            <aside class="explore_sidebar_cont" :aria-label="$t('page.explore.filters')">
                <div class="h3 explore_sidebar_wrap">
                    <button
                        :aria-label="$t('page.explore.filters')"
                        @click="isSideClose = !isSideClose"
                        class="btn-nostyle"
                    >
                        <span class="explore_sidebar_label">{{ $t('page.explore.filters') }}</span>
                        <span class="explore_sidebar_icon">
                            <app-iconset icon="filter-arrow" rotate="180deg" size="24px" />
                        </span>
                    </button>
                </div>
                <nft-filters v-model="filters" />
            </aside>
        </div>
        <div>
            <section :aria-label="$t('page.explore.filters')">
                <div class="explore_nftlist_header">
                    <div class="explore_results">
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
            </section>
            <section :aria-label="$t('page.explore.nftList')">
                <nft-main-list :filters="filters" @tokens-count="onTokensCount" @loading="onNftMainListLoading" />
            </section>
        </div>
        <div class="explore_filterButton" aria-hidden="true">
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
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

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

    computed: {
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

    created() {
        if (document.body.clientWidth <= 600) this.isSideClose = true;
    },

    mounted() {
        focusElem(this.$el);
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
