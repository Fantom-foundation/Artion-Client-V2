<template>
    <header class="appheader">
        <div class="appheader_col">
            <router-link to="/"><img src="artion-logo.svg" height="35px" alt="artion logo"/></router-link>
            <app-search-bar />
        </div>
        <div class="appheader_col">
            <app-menu />
            <wallet-button />
        </div>
    </header>
</template>

<script>
import AppMenu from '@/modules/app/components/AppMenu/AppMenu.vue';
import WalletButton from '@/modules/wallet/components/WalletButton/WalletButton.vue';
import AppSearchBar from '@/modules/app/components/AppSearchBar/AppSearchBar.vue';

export default {
    name: 'AppHeader',

    components: { AppSearchBar, WalletButton, AppMenu },

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
