<template>
    <f-infinite-scroll
        ref="infScroll"
        :total-items="totalItems"
        :per-page="perPage"
        :curr-page="currPage"
        :loading="loading"
        :root="root"
        :root-margin="rootMargin"
        v-on="$listeners"
    >
        <div class="nftlist" :class="[`nftlist-density-${cDensity}`]">
            <nft-card
                v-for="nft in tokens"
                :nftData="nft"
                :isFavorite="searchFavoriteNft(nft.tokenId)"
                :key="`${nft.contract}_${nft.tokenId}`"
            />
        </div>
    </f-infinite-scroll>
</template>
<script>
import NftCard from '@/modules/nfts/components/NftCard/NftCard.vue';
import FInfiniteScroll from 'fantom-vue-components/src/components/FInfiniteScroll/FInfiniteScroll.vue';
import FPagination from 'fantom-vue-components/src/components/FPagination/FPagination.vue';
import FIntersectionObserver from 'fantom-vue-components/src/components/FIntersectionObserver/FIntersectionObserver.vue';
import { getUserFavoriteTokens } from '@/modules/account/queries/user-favorite-tokens.js';
import { mapState } from 'vuex';

export default {
    name: 'NftList',

    components: { NftCard, FInfiniteScroll },

    props: {
        tokens: {
            type: Array,
            default() {
                return [];
            },
        },
        density: {
            type: [Number, String],
            default: 'large',
        },
        loading: {
            type: Boolean,
            default: false,
        },
        /** Total amount of items (FPagination prop) */
        totalItems: { ...FPagination.props.totalItems },
        /** Number of items per page (FPagination prop) */
        perPage: { ...FPagination.props.perPage },
        /** Current page number (FPagination prop) */
        currPage: { ...FPagination.props.currPage },
        ...FIntersectionObserver.props,
    },

    data() {
        return {
            likedNftIds: [],
        };
    },

    computed: {
        ...mapState('wallet', {
            address: 'account',
        }),

        cDensity() {
            const { density } = this;
            const densityNum = parseInt(density);

            if (!isNaN(densityNum)) {
                return densityNum === 200 ? 'small' : 'large';
            }

            return density;
        },
    },

    watch: {
        address: {
            async handler(value) {
                if (value) {
                    let pagination = { first: this.perPage };
                    let userData = await getUserFavoriteTokens(this.address, pagination);
                    if (userData.edges.length) {
                        this.likedNftIds = userData.edges.map(edge => {
                            return edge.node.tokenId;
                        });
                    }
                }
            },
            immediate: true,
        },
    },

    methods: {
        searchFavoriteNft(id) {
            return this.likedNftIds.includes(id);
        },

        /**
         * @param {number} pageNum
         */
        goToPageNum(pageNum) {
            const { infScroll } = this.$refs;

            if (infScroll) {
                infScroll.goToPage(pageNum, true);
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
