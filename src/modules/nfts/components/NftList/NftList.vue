<template>
    <div class="nftlist" :style="gridStyle">
        <nft-card v-for="nft in tokens" :nftData="nft" :key="`${nft.address}_${nft.tokenId}`" />
    </div>
</template>
<script>
import NftCard from '@/modules/nfts/components/NftCard/NftCard.vue';
///token-image/0x61aF4D29f672E27a097291F72fc571304BC93521/0x282

export default {
    name: 'NftList',

    components: { NftCard },

    props: {
        tokens: {
            type: Array,
            default() {
                return [];
            },
        },
        density: {
            type: [Number, String],
            default: 280,
        },
    },

    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(auto-fill, minmax(${this.density}px, 1fr))`,
            };
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
