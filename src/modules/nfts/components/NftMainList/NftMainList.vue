<template>
    <div class="nftmainList">
        <nft-list
            :tokens="items"
            :loading="loading"
            :total-items="totalItems"
            :per-page="perPage"
            :density="density"
            root-margin="400px 0px"
            @page-change="_onPageChange"
        />
    </div>
</template>

<script>
import NftList from '@/modules/nfts/components/NftList/NftList.vue';
import { getCollections } from '@/modules/nfts/queries/collections.js';
import { getCollectionTokens } from '@/modules/nfts/queries/collection-tokens.js';
import { dataPageMixin } from '@/common/mixins/data-page.js';

export default {
    name: 'NftMainList',

    components: { NftList },

    mixins: [dataPageMixin],

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
            contract: '',
            perPage: 20,
        };
    },

    watch: {
        filters(value) {
            console.log('filters changed: ', JSON.stringify(value));
        },

        loading(value) {
            this.$emit('loading', value);
        },
    },

    created() {
        this.loadTokens();
    },

    methods: {
        async loadPage(_pagination = { first: this.perPage }, _filterSort = {}) {
            if (this.contract) {
                return await getCollectionTokens(this.contract, _pagination, _filterSort);
            }

            return null;
        },

        async loadTokens() {
            const collections = await getCollections();
            let collection = null;

            if (collections) {
                collection = collections.edges[0].node;
                if (collection.contract) {
                    this.contract = collection.contract;
                    this._loadPage();
                }
            }
        },
    },
};
</script>

<style scoped></style>
