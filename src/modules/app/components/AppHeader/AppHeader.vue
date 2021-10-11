<template>
    <header class="appheader">
        <div class="appheader_col">
            <router-link to="/" class="appheader_logo">
                <img src="artion-logo-2.svg" height="35px" alt="artion logo" />
            </router-link>
            <app-search-bar />
        </div>
        <div class="appheader_col">
            <app-menu />
            <wallet-button-wrap />
        </div>
    </header>
</template>

<script>
import AppMenu from '@/modules/app/components/AppMenu/AppMenu.vue';
import AppSearchBar from '@/modules/app/components/AppSearchBar/AppSearchBar.vue';
import WalletButtonWrap from '@/modules/wallet/components/WalletButtonWrap/WalletButtonWrap.vue';

export default {
    name: 'AppHeader',

    components: { WalletButtonWrap, AppSearchBar, AppMenu },

    /*computed: {
        classes() {
            return {
                'appheader-home': this.$route.name === 'home',
            };
        },
    },*/
};
</script>

<style lang="scss">
@use "style";
</style>
