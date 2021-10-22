<template>
    <nav class="pg-menu flex gap-9" :class="{ 'pg-menu--mobile': isMobile }">
        <svg
            v-if="isMobile"
            class="pg-menu__logo"
            width="144"
            height="84"
            viewBox="0 0 144 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21.8824 10.0925H52.2477L37.0649 27.881L21.8824 10.0925ZM73.7542 30.5907L82.368 20.4985L91.2498 10.0925H134.512L143.126 0H86.5948L77.981 10.0925L69.0996 20.4985L61.1408 29.8231L60.4855 30.5907L50.0077 43.0452L49.9317 42.956L43.6995 35.654L65.5161 10.0925L74.1299 0H0L8.61379 10.0925L30.4306 35.654L37.0647 43.4267L43.2975 50.729L43.4211 50.874L49.9315 58.5018L50.0558 58.6492L64.8099 76.1735L71.3987 84L78.0391 76.2334L89.4058 62.9398L117.016 30.5907L125.63 20.4985H93.2293L84.6152 30.5907H103.747L82.7716 55.1668L71.4503 68.4077L56.6438 50.8215L67.7749 37.5961L73.754 30.5907H73.7542Z"
                fill="#EAEAF1"
            />
        </svg>
        <router-link
            v-for="(item, index) in navigation"
            :key="`am_${index}`"
            :to="{ path: item.path, hash: item.hash, name: item.name || null }"
            @click.native="$emit('close')"
        >
            {{ item.label }}
        </router-link>
        <wallet-button-wrap
            class="pg-menu__wallet-button"
            v-if="isMobile"
            :wallet-menu="walletMenu"
            @click="$emit('close')"
        />
    </nav>
</template>

<script>
import WalletButtonWrap from '@/modules/wallet/components/WalletButtonWrap/WalletButtonWrap.vue';

export default {
    name: 'AppMenu',

    components: {
        WalletButtonWrap,
    },

    data() {
        return {
            isMobile: false,
            navigation: [
                {
                    hash: 'drop',
                    path: '/',
                    label: this.$t('navigation.drop'),
                },
                {
                    hash: 'nfts',
                    path: '/',
                    label: this.$t('navigation.nfts'),
                },
                {
                    name: 'pg-account-my-nfts',
                    label: this.$t('navigation.myNfts'),
                },
                {
                    hash: 'faq',
                    path: '/',
                    label: 'FAQ',
                },
            ],
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

    methods: {
        handleResize() {
            this.isMobile = window.innerWidth < 768;
        },
    },

    created() {
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
