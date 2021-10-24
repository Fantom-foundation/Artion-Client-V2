<template>
    <header class="pg-header">
        <div class="pg-header__col">
            <router-link to="/" class="pg-header__logo">
                <img src="artion-white.svg" height="35px" alt="artion logo" />
            </router-link>
        </div>

        <div class="pg-header__col pg-header__col--menu">
            <p-g-menu />
        </div>

        <div class="pg-header__col pg-header__col--wallet-button">
            <wallet-button-wrap :wallet-menu="walletMenu" />
        </div>

        <div class="pg-header__col pg-header__col--burger" @click="isMobileNavOpen = !isMobileNavOpen">
            <button class="pg-header__hamburger" :class="{ 'pg-header__hamburger--open': isMobileNavOpen }">
                <div class="pg-header__hamburger-bar pg-header__hamburger-bar--1"></div>
                <div class="pg-header__hamburger-bar pg-header__hamburger-bar--2"></div>
                <div class="pg-header__hamburger-bar pg-header__hamburger-bar--3"></div>
            </button>
        </div>

        <nav class="pg-header__mobile-nav" :class="{ 'pg-header__mobile-nav--active': isMobileNavOpen }">
            <p-g-menu :is-mobile="isMobileNavOpen" @close="isMobileNavOpen = false" />
        </nav>
    </header>
</template>

<script>
import PGMenu from '../PGMenu/PGMenu.vue';
import WalletButtonWrap from '@/modules/wallet/components/WalletButtonWrap/WalletButtonWrap.vue';
import appConfig from '@/app.config.js';

export default {
    name: 'PGHeader',

    components: { WalletButtonWrap, PGMenu },

    data() {
        return {
            isMobileNavOpen: false,
            walletMenu: [
                /*{
                    label: this.$t('walletMenu.settings'),
                    route: 'pg-account-settings',
                },*/
                {
                    label: this.$t('walletMenu.logout'),
                    action: 'logout',
                },
            ],
        };
    },

    methods: {
        handleResize() {
            this.isMobileNavOpen = false;
        },
    },

    created() {
        if (appConfig.settingsOn) {
            this.walletMenu.unshift({
                label: this.$t('walletMenu.settings'),
                route: 'pg-account-settings',
            });
        }

        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
};
</script>

<style lang="scss">
@use "style";
</style>
