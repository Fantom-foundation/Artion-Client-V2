<template>
    <div class="collectionlist">
        <f-infinite-scroll
            ref="infScroll"
            :total-items="totalItems"
            :per-page="perPage"
            :curr-page="currPage"
            :has-next-page="hasNextPage"
            :loading="loading"
            :root="root"
            :root-margin="rootMargin"
            v-on="$listeners"
        >
            <div class="collectionlist_search">
                <a-search-field
                    id="collectionlistsearch_input"
                    field-size="large"
                    no-label
                    :value="searchTextValue"
                    :aria-label="$t('collectionlist.label')"
                    :placeholder="$t('collectionlist.placeholder')"
                    :throttle-input-interval="250"
                    :loading="loading"
                    @input="onInput"
                />
                <a-placeholder block :content-loaded="totalItems > 0" replacement-text="1000 results">
                    {{ totalItems }} {{ $t('results') }}
                </a-placeholder>
            </div>
            <div class="collectionlist_cards">
                <collection-card
                    v-for="(collection, index) in collections"
                    :collection="collection"
                    :key="`${collection.contract}_${index}`"
                />
            </div>
        </f-infinite-scroll>
    </div>
</template>

<script>
import ASearchField from '@/common/components/ASearchField/ASearchField.vue';
import FPagination from 'fantom-vue-components/src/components/FPagination/FPagination.vue';
import CollectionCard from '@/modules/collections/components/CollectionCard/CollectionCard.vue';
import FInfiniteScroll from 'fantom-vue-components/src/components/FInfiniteScroll/FInfiniteScroll.vue';
import FIntersectionObserver from 'fantom-vue-components/src/components/FIntersectionObserver/FIntersectionObserver.vue';
export default {
    name: 'CollectionList',
    components: {
        CollectionCard,
        FInfiniteScroll,
        ASearchField,
    },
    props: {
        collections: {
            type: Array,
            default() {
                return [];
            },
        },
        loading: {
            type: Boolean,
            default: false,
        },
        hasNextPage: {
            type: Boolean,
            default: true,
        },
        /** Total amount of items (FPagination prop) */
        totalItems: { ...FPagination.props.totalItems },
        /** Number of items per page (FPagination prop) */
        perPage: { ...FPagination.props.perPage },
        /** Current page number (FPagination prop) */
        currPage: { ...FPagination.props.currPage },
        ...FIntersectionObserver.props,
    },
    data() {
        return {
            searchTextValue: '',
        };
    },
    methods: {
        onInput(value) {
            this.searchTextValue = value;
            this.$emit('on-search', value);
        },
    },
};
</script>
<style lang="scss">
@use "style";
</style>
