<template>
    <div class="nftcreate">
        <nft-create-form />
    </div>
</template>

<script>
import NftCreateForm from '@/modules/nfts/components/NftCreateForm/NftCreateForm';
export default {
    name: 'NftCreate',
    components: { NftCreateForm },
};
</script>
