<template>
    <div class="appsearchbar">
        <a-search-field
            field-size="large"
            :aria-label="$t('appsearchbar.label')"
            :placeholder="$t('appsearchbar.placeholderTmp')"
            no-label
            v-model="searchText"
            @keyup.native.enter.prevent="onEnterKey"
            @delete-text="onDeleteText"
        />
    </div>
</template>

<script>
import ASearchField from '@/common/components/ASearchField/ASearchField.vue';

export default {
    components: { ASearchField },

    name: 'AppSearchBar',

    data() {
        return {
            searchText: '',
        };
    },

    watch: {
        $route: {
            handler(value) {
                this.searchText = value.query.search || '';
            },
            immediate: true,
        },
    },

    methods: {
        onEnterKey() {
            const searchText = this.searchText.trim();

            if (searchText) {
                this.$router.push({ name: 'explore', query: { search: searchText } });
            }
        },

        onDeleteText() {
            this.$router.push({ name: 'explore', query: { ...(this.$route.query || {}), search: undefined } });
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
