<template>
    <div class="appsearchbar">
        <a-search-field
            field-size="large"
            :aria-label="$t('appsearchbar.label')"
            :placeholder="$t('appsearchbar.placeholder')"
            no-label
        />
    </div>
</template>

<script>
import ASearchField from '@/common/components/ASearchField/ASearchField.vue';

export default {
    components: { ASearchField },

    name: 'AppSearchBar',
};
</script>

<style lang="scss">
@use "style";
</style>
