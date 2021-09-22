<template>
    <section class="appsectionabout container">
        <h2 class="h1 tea-center">{{ $t('appsectionabout.title') }}</h2>
        <app-about-card-list />
    </section>
</template>

<script>
import AppAboutCardList from '@/modules/app/components/AppAboutCardList/AppAboutCardList.vue';

export default {
    name: 'AppSectionAbout',

    components: { AppAboutCardList },
};
</script>

<style lang="scss">
@use "style";
</style>
