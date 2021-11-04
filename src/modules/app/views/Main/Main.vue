<template>
    <div class="main">
        <app-header />

        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import AppHeader from '@/modules/app/components/AppHeader/AppHeader.vue';
export default {
    name: 'Main',

    components: { AppHeader },
};
</script>

<style lang="scss">
@use "style";
</style>
