<template>
    <div class="pg-nfts-list">
        <h2 class="h2 pg-nfts-list__header">The NFTS</h2>
        <div class="theme-pg-u-w-100" v-for="(item, index) in nfts" :key="index">
            <p-g-nft></p-g-nft>
            <div v-if="index !== nfts.length - 1" class="pg-nfts-list__separator"></div>
        </div>
    </div>
</template>

<script>
import PGNft from '../PGNft/PGNft';

export default {
    name: 'PGNftsList',

    components: { PGNft },

    data() {
        return {
            nfts: [0, 1, 2],
        };
    },
};
</script>

<style lang="scss">
@use "style";
</style>
