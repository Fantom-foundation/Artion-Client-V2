<template>
    <div class="apptextsearchresults">
        <div v-if="collections.length > 0">
            <h3 id="apptextsearchresults_collections">Collections</h3>

            <ul aria-labelledby="apptextsearchresults_collections">
                <li v-for="collection in collections" :key="`${collection.contract}_atsr_col`">
                    <router-link
                        :to="{ name: 'explore', query: { collections: collection.contract } }"
                        class="apptextsearchresults_item"
                    >
                        <f-image size="40px" :src="getCollectionImageUrl(collection.contract)" :alt="collection.name" />
                        {{ collection.name }}
                    </router-link>
                </li>
            </ul>
        </div>

        <div v-if="tokens.length > 0">
            <h3 id="apptextsearchresults_tokens">Items</h3>

            <ul aria-labelledby="apptextsearchresults_tokens">
                <li v-for="token in tokens" :key="`${token.contract}_${token.tokenId}_atsr_tok`">
                    <router-link
                        :to="{ name: 'nft-detail', params: { tokenContract: token.contract, tokenId: token.tokenId } }"
                        class="apptextsearchresults_item"
                    >
                        <f-image size="40px" :src="getImageThumbUrl(token.imageThumb)" :alt="token.name" />
                        {{ token.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import FImage from 'fantom-vue-components/src/components/FImage/FImage.vue';
import { getCollectionImageUrl, getImageThumbUrl } from '@/utils/url.js';

export default {
    name: 'AppTextSearchResults',

    components: { FImage },

    props: {
        /** Result from query textSearch */
        results: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            collections: [],
            tokens: [],
        };
    },

    watch: {
        results: {
            handler(value) {
                this.processResult(value);
            },
            immediate: true,
        },
    },

    methods: {
        processResult(results = []) {
            const collections = [];
            const tokens = [];

            results.forEach(r => {
                if (r.collection) {
                    collections.push({ ...r.collection });
                } else if (r.token) {
                    tokens.push({ ...r.token });
                }
            });

            this.collections = collections;
            this.tokens = tokens;
        },

        getCollectionImageUrl,
        getImageThumbUrl,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
