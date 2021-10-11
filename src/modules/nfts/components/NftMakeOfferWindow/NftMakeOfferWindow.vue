<template>
    <a-window ref="window" :title="$t('nftmakeofferwindow.offer')" class="fwindow-width-5">
        <nft-make-offer-form />
    </a-window>
</template>
<script>
import NftMakeOfferForm from '@/modules/nfts/components/NftMakeOfferForm/NftMakeOfferForm';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
export default {
    name: 'NftMakeOfferWindow',
    components: { AWindow, NftMakeOfferForm },
    methods: {
        ...copyMethods(AWindow, ['show', 'hide', 'toggle'], 'window'),
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
