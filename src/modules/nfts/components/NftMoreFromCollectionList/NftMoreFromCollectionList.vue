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
        contract: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            perPage: 10,
            items: [],
        };
    },

    created() {
        this.loadTokens();
    },

    methods: {
        async loadTokens() {
            let pagination = { first: this.perPage };
            let filterSort = { collections: this.contract };
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
