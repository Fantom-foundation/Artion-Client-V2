<template>
    <section class="appsectionabout container" :aria-labelledby="id">
        <h2 :id="id" class="h1 tea-center">{{ $t('appsectionabout.title') }}</h2>
        <app-about-card-list />
    </section>
</template>

<script>
import AppAboutCardList from '@/modules/app/components/AppAboutCardList/AppAboutCardList.vue';
import { getUniqueId } from 'fantom-vue-components/src/utils';

export default {
    name: 'AppSectionAbout',

    components: { AppAboutCardList },

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
