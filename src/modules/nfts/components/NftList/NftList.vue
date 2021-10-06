<template>
    <div class="nftlist" :style="gridStyle">
        <nft-card v-for="nft in nftData" :nftData="nft" :key="nft.id" />
    </div>
</template>
<script>
import { nftData } from '@/common/constants/dummy/nftdata';
import NftCard from '@/modules/nfts/components/NftCard/NftCard.vue';
export default {
    name: 'NftList',
    components: { NftCard },
    props: {
        density: {
            type: [Number, String],
            default: 280,
        },
    },
    data() {
        return {
            nftData,
        };
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
