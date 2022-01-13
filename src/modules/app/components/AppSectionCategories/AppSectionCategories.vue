<template>
    <section class="appsectioncategories container" :aria-labelledby="id">
        <h2 :id="id" class="h1 tea-center">{{ $t('appsectioncategories.title') }}</h2>
        <app-category-card-list />
    </section>
</template>

<script>
import AppCategoryCardList from '@/modules/app/components/AppCategoryCardList/AppCategoryCardList.vue';
import { getUniqueId } from 'fantom-vue-components/src/utils';

export default {
    name: 'AppSectionCategories',

    components: { AppCategoryCardList },

    data() {
        return {
            id: getUniqueId(),
        };
    },
};
</script>

<style lang="scss">
@use "style";
</style>
