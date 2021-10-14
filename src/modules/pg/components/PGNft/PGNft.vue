<template>
    <div class="pg-nft">
        <p-g-nft-card></p-g-nft-card>
        <div class="pg-nft__text">
            <h3 class="h3">
                Baku 2021 <br />
                <span class="theme-pg-u-font-weight-normal">Podium</span>
            </h3>
            <p class="pg-nft__perex">
                May '21, Azerbaijan - Pierre Gasly executes a perfect weekend in Baku and secure his third podium in
                Formula One™, the first of 2021.
            </p>
            <h5 class="h5">This unique NFT is redeemable for:</h5>
            <p class="theme-pg-u-mb-0">Promotion helmet from Brazil 2019 race weekend AND</p>
            <p class="theme-pg-u-mb-0">Meet and greet with Pierre over the next 12 months AND</p>
            <p class="theme-pg-u-mb-0">Signed mini-helmet and merchandising</p>

            <p class="pg-nft__start-price">Bidding starts at 2,000 FTM.</p>

            <div class="pg-nft__backdrop pg-nft__backdrop--1"></div>
            <div class="pg-nft__backdrop pg-nft__backdrop--2"></div>
        </div>
    </div>
</template>

<script>
import PGNftCard from '../PGNftCard/PGNftCard';

export default {
    name: 'PGNft',

    components: {
        PGNftCard,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
