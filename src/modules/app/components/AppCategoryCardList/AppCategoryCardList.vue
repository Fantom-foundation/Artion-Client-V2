<template>
    <div class="appcategorycardlist">
        <app-category-card v-for="item in categories" :key="item.id" :category="item" />
        <app-category-card no-category />
    </div>
</template>

<script>
import AppCategoryCard from '@/modules/app/components/AppCategoryCard/AppCategoryCard';
import { CATEGORIES } from '@/common/constants/categories.js';
export default {
    name: 'AppCategoryCardList',
    components: { AppCategoryCard },
    data: () => ({
        categories: CATEGORIES(),
    }),
};
</script>

<style lang="scss">
@use "style";
</style>
