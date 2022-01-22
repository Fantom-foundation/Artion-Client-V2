<template>
    <div v-if="collection" class="nftdetailcollection">
        <a-placeholder :content-loaded="!!collection.contract" :replacement-num-chars="15">
            <router-link :to="{ name: 'explore', query: { collections: collection.contract } }">
                {{ collection.name }}
            </router-link>
        </a-placeholder>
    </div>
</template>

<script>
export default {
    name: 'NftDetailCollection',

    props: {
        /** @type {Collection} */
        collection: {
            type: Object,
            default() {
                return {};
            },
        },
    },
};
</script>
