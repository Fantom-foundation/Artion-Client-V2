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
import { dataPageMixin } from '@/common/mixins/data-page.js';
import { mapState } from 'vuex';
import { getBannedTokens } from '@/modules/account/queries/banned-tokens.js';

export default {
    name: 'BannedTokenList',

    components: { NftList },

    mixins: [dataPageMixin],

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },

    computed: {
        ...mapState('app', {
            density: 'nftsDensity',
        }),
    },

    watch: {
        userAddress: {
            handler(value) {
                if (value) {
                    this.loadTokens();
                } else {
                    this.loading = true;
                }
            },
            immediate: true,
        },

        loading(value) {
            this.$emit('loading', value);
        },
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }) {
            const tokens = await getBannedTokens(pagination);

            if (tokens.edges) {
                tokens.edges = tokens.edges
                    .filter(item => item.node.token) // skip non-existing favorites
                    .map(item => {
                        item.node = { ...item.node.token, _banned: true };
                        return item;
                    });
                return tokens;
            }
        },

        async loadTokens() {
            await this._loadPage();
        },
    },
};
</script>
