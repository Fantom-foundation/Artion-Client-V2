<template>
    <div class="nftmorefromcollectionlist">
        <nft-list :tokens="items" :per-page="perPage" root-margin="400px 0px" />
    </div>
</template>

<script>
import NftList from '@/modules/nfts/components/NftList/NftList.vue';
import { getTokens } from '@/modules/nfts/queries/tokens.js';

export default {
    name: 'NftMoreFromCollectionList',

    components: { NftList },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
            required: true,
        },
    },

    data() {
        return {
            perPage: 10,
            items: [],
        };
    },

    watch: {
        token(value) {
            if (value) {
                this.loadTokens();
            }
        },
    },

    mounted() {
        this.loadTokens();
    },

    methods: {
        async loadTokens() {
            const { contract } = this.token;

            if (!contract) {
                return;
            }

            let pagination = { first: this.perPage };
            let filterSort = { filter: { collections: [this.token.contract] }, sortBy: 'CREATED', sortDir: 'DESC' };
            const tokens = await getTokens(pagination, filterSort);
            this.items = tokens.edges.map(edge => edge.node);
        },
    },
};
</script>

<style>
.nftmorefromcollectionlist .nftlist .nftcard {
    min-width: 280px;
}
</style>
