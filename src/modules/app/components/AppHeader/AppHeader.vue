<template>
    <header class="appheader">
        <div class="appheader_logo">
            <router-link to="/" class="appheader_logo">
                <img src="/artion.svg" height="35px" alt="artion logo" />
                <div class="appheader_title">Artion</div>
            </router-link>
        </div>
        <div class="appheader_col">
            <div class="appheader_mobile" :class="{ show: isShowMobileMenu }">
                <app-search-bar-with-whisperer v-if="searchBarWithWhisperer" />
                <app-search-bar v-else />

                <app-menu />
            </div>
            <wallet-button-wrap />
            <app-hamburger class="appheader_burger" @switched="isShowMobileMenu = $event" />
        </div>
    </header>
</template>

<script>
import AppMenu from '@/modules/app/components/AppMenu/AppMenu.vue';
import AppSearchBar from '@/modules/app/components/AppSearchBar/AppSearchBar.vue';
import WalletButtonWrap from '@/modules/wallet/components/WalletButtonWrap/WalletButtonWrap.vue';
import AppHamburger from '@/modules/app/components/AppHamburger/AppHamburger.vue';
import appConfig from '@/app.config.js';
import AppSearchBarWithWhisperer from '@/modules/app/components/AppSearchBarWithWhisperer/AppSearchBarWithWhisperer.vue';

export default {
    name: 'AppHeader',

    components: { AppSearchBarWithWhisperer, WalletButtonWrap, AppSearchBar, AppMenu, AppHamburger },

    data() {
        return {
            isShowMobileMenu: false,
            searchBarWithWhisperer: appConfig.toggles.searchBarWithWhisperer,
        };
    },

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
