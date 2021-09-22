<template>
    <div class="appsectionnftcard _flex _flex-column">
        <f-image :src="nft.img" :alt="nft.title" />
        <div class="appsectionnftcard_text">
            <div class="appsectionnftcard_collection">
                <a-placeholder :content-loaded="!!nft.collection" block>
                    {{ nft.collection }}
                </a-placeholder>
            </div>
            <h3 class="appsectionnftcard_title">
                <a-placeholder :content-loaded="!!nft.title" block>
                    {{ nft.title }}
                </a-placeholder>
            </h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppSectionNftCard',

    props: {
        nft: {
            type: Object,
            default() {
                return {
                    title: '',
                    collection: '',
                    img: '',
                };
            },
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
