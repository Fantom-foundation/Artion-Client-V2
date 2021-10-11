<template>
    <header class="pg-header">
        <div class="pg-header__col">
            <router-link to="/" class="pg-header__logo">
                <img src="artion-white.svg" height="35px" alt="artion logo" />
            </router-link>
        </div>

        <div class="pg-header__col">
            <p-g-menu />
        </div>

        <div class="pg-header__col">
            <wallet-button />
        </div>
    </header>
</template>

<script>
import PGMenu from '../PGMenu/PGMenu.vue';
import WalletButton from '@/modules/wallet/components/WalletButton/WalletButton.vue';

export default {
    name: 'PGHeader',

    components: { WalletButton, PGMenu },
};
</script>

<style lang="scss">
@use "style";
</style>
