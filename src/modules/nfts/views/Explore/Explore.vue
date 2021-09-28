<template>
    <!-- <div class="explore">Explore {{ this.$route.query }}</div> -->
    <div class="explore">
        <div class="sidebar">
            Sidebar
        </div>
        <nft-list />
    </div>
</template>

<script>
import NftList from '@/modules/nfts/components/NftList/NftList';
export default {
    name: 'Explore',
    components: { NftList },
};
</script>

<style>
.explore {
    display: grid;
    grid-template-columns: 260px 1fr;
}
</style>
