<template>
    <div class="collectioncard">
        <router-link :to="{ name: 'explore', query: { collections: collection.contract } }">
            <div class="collectioncard_name">{{ collection.name }}</div>
            <div class="collectioncard_cont">
                <f-image
                    size="100%"
                    fit="cover"
                    :src="getCollectionImageUrl(collection.contract)"
                    :alt="collection.name"
                />
            </div>
        </router-link>
    </div>
</template>

<script>
import { getCollectionImageUrl } from '@/utils/url.js';
export default {
    name: 'CollectionCard',
    props: {
        collection: {
            type: Object,
        },
    },
    methods: {
        getCollectionImageUrl,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
