<template>
    <div class="nftcreate">
        <h1 class="not-visible" data-focus>{{ $t('page.nftCreate.title') }}</h1>

        <nft-create-form />
    </div>
</template>

<script>
import NftCreateForm from '@/modules/nfts/components/NftCreateForm/NftCreateForm';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

export default {
    name: 'NftCreate',

    components: { NftCreateForm },

    mounted() {
        focusElem(this.$el);
    },
};
</script>
