<template>
    <div class="nftmainList">
        <nft-list :tokens="tokens" :density="density" />
    </div>
</template>

<script>
import NftList from '@/modules/nfts/components/NftList/NftList.vue';
import { nftData } from '@/common/constants/dummy/nftdata';
import { getCollections } from '@/modules/nfts/queries/collections.js';
import { getCollectionTokens } from '@/modules/nfts/queries/collection-tokens.js';

export default {
    name: 'NftMainList',

    components: { NftList },

    props: {
        filters: {
            type: Object,
            default() {
                return {};
            },
        },
        density: {
            type: [Number, String],
            default: 280,
        },
    },

    data() {
        return {
            nftData,
            tokens: [],
        };
    },

    watch: {
        filters(value) {
            console.log('filters changed: ', JSON.stringify(value));
        },
    },

    created() {
        this.tmp();
    },

    methods: {
        async tmp() {
            const collections = await getCollections();
            let collection = null;

            if (collections) {
                collection = collections.edges[0].node;
                if (collection.address) {
                    const tokens = await getCollectionTokens(collection.address, { first: 10 });

                    this.tokens = tokens.edges.map(token => token.node);
                }
            }
        },
    },
};
</script>

<style scoped></style>
