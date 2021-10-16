<template>
    <header class="appheader">
        <div class="appheader_logo">
            <router-link to="/" class="appheader_logo">
                <img src="artion.svg" height="35px" alt="artion logo" />
                <div class="appheader_title">Artion</div>
            </router-link>
        </div>
        <div class="appheader_col">
            <div class="appheader_mobile" :class="{ show: isShowMobileMenu }">
                <app-search-bar />
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

export default {
    name: 'AppHeader',

    components: { WalletButtonWrap, AppSearchBar, AppMenu, AppHamburger },

    data() {
        return {
            isShowMobileMenu: false,
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
