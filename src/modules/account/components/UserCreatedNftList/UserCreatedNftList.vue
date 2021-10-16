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
import { filtersToQueryFilters, getDefaultFilters } from '@/modules/nfts/filters.js';
import { getUserCreatedTokens } from '@/modules/account/queries/user-created-tokens.js';

export default {
    name: 'UserCreatedNftList',

    components: { NftList },

    mixins: [dataPageMixin],

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
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
            perPage: 20,
        };
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

        filters() {
            this.loadTokens();
        },

        loading(value) {
            this.$emit('loading', value);
        },
    },

    methods: {
        async loadPage(
            pagination = { first: this.perPage },
            filterSort = filtersToQueryFilters(this.filters, getDefaultFilters())
        ) {
            const tokens = await getUserCreatedTokens(this.userAddress, pagination, filterSort);

            return tokens;
        },

        async loadTokens() {
            await this._loadPage({
                filterSort: filtersToQueryFilters(this.filters, getDefaultFilters()),
            });
        },
    },
};
</script>
