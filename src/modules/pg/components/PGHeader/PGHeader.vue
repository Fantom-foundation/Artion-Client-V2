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

        <div class="pg-header__col pg-header__col--burger">
            <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7L1 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 1H1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M19.2729 12.9288L1 13"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </header>
</template>

<script>
import PGMenu from '../PGMenu/PGMenu.vue';
import WalletButtonWrap from '@/modules/wallet/components/WalletButtonWrap/WalletButtonWrap.vue';

export default {
    name: 'PGHeader',

    components: { WalletButtonWrap, PGMenu },

    data() {
        return {
            walletMenu: [
                {
                    label: this.$t('walletMenu.settings'),
                    route: 'pg-account-settings',
                },
                {
                    label: this.$t('walletMenu.logout'),
                    action: 'logout',
                },
            ],
        };
    },
};
</script>

<style lang="scss">
@use "style";
</style>
