<template>
    <section class="appsectioncategories container">
        <h2 class="h1 tea-center">{{ $t('appsectioncategories.title') }}</h2>
        <app-category-card-list />
    </section>
</template>

<script>
import AppCategoryCardList from '@/modules/app/components/AppCategoryCardList/AppCategoryCardList.vue';
export default {
    name: 'AppSectionCategories',
    components: { AppCategoryCardList },
};
</script>

<style lang="scss">
@use "style";
</style>
