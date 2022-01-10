<template>
    <div class="main">
        <f-hidden-nav-link to="main">{{ $t('skipToContent') }}</f-hidden-nav-link>

        <app-header />

        <main id="main" tabindex="-1">
            <router-view />
        </main>
    </div>
</template>

<script>
import AppHeader from '@/modules/app/components/AppHeader/AppHeader.vue';
import FHiddenNavLink from 'fantom-vue-components/src/components/FHiddenNavLink/FHiddenNavLink.vue';

export default {
    name: 'Main',

    components: { AppHeader, FHiddenNavLink },
};
</script>

<style lang="scss">
@use "style";
</style>
