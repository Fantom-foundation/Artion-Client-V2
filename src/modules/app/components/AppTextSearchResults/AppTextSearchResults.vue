<template>
    <div class="apptextsearchresults">
        <div v-if="collections.length > 0">
            <h3 id="apptextsearchresults_collections">{{ $t('apptextsearchresults.collections') }}</h3>

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

        <div v-if="users.length > 0">
            <h3 id="apptextsearchresults_users">{{ $t('apptextsearchresults.accounts') }}</h3>

            <ul aria-labelledby="apptextsearchresults_users">
                <li v-for="user in users" :key="`${user.address}_atsr_user`">
                    <router-link
                        :to="{ name: 'account', params: { address: user.address } }"
                        class="apptextsearchresults_item"
                    >
                        <f-image size="40px" :src="getImageThumbUrl(user.avatarThumb)" :alt="user.username" />
                        {{ user.username }}
                    </router-link>
                </li>
            </ul>
        </div>

        <div v-if="tokens.length > 0">
            <h3 id="apptextsearchresults_tokens">{{ $t('apptextsearchresults.items') }}</h3>

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
            users: [],
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
            const users = [];

            results.forEach(r => {
                if (r.collection) {
                    collections.push({ ...r.collection });
                } else if (r.token) {
                    tokens.push({ ...r.token });
                } else if (r.user) {
                    users.push({ ...r.user });
                }
            });

            this.collections = collections;
            this.tokens = tokens;
            this.users = users;
        },

        getCollectionImageUrl,
        getImageThumbUrl,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
