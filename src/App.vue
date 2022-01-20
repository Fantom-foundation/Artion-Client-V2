<template>
    <div id="app">
        <!--        <app-language />-->

        <router-view />

        <wallet-picker />
        <f-app-theme :themes="['theme-default', 'theme-dark', 'theme-pg']" />
        <app-dark-theme />
        <f-tooltip with-arrow hide-on-document-scroll />
        <f-notifications
            strategy="newest-first"
            with-icon
            position="top-center"
            hide-on-click
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
        />
        <f-network-status />
        <f-aria-alert />
    </div>
</template>

<script>
import appConfig from '@/app.config.js';
import FNetworkStatus from 'fantom-vue-components/src/components/FNetworkStatus/FNetworkStatus.vue';
// import FNetworkStatus from 'fantom-vue-components/src/components/FNetworkStatus/FNetworkStatus.vue';
import FNotifications from 'fantom-vue-components/src/components/FNotifications/FNotifications.vue';
import FTooltip from 'fantom-vue-components/src/components/FTooltip/FTooltip.vue';
import FAppTheme from 'fantom-vue-components/src/components/FAppTheme/FAppTheme.vue';
import FAriaAlert from 'fantom-vue-components/src/components/FAriaAlert/FAriaAlert.vue';
import WalletPicker from '@/modules/wallet/components/WalletPicker/WalletPicker.vue';
import { getBearerToken, setUser } from '@/modules/account/auth.js';
import { mapState } from 'vuex';
import AppDarkTheme from '@/modules/app/components/AppDarkTheme/AppDarkTheme.vue';
import { clientInfo } from 'fantom-vue-components/src/utils/client-info.js';

// import AppLanguage from '@/modules/app/components/AppLanguage/AppLanguage.vue';

export default {
    name: 'App',

    components: { AppDarkTheme, WalletPicker, FNotifications, FNetworkStatus, FTooltip, FAppTheme, FAriaAlert },

    data() {
        return {
            appTitle: appConfig.name,
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
        ...mapState('app', {
            rtlDirection: 'rtlDirection',
        }),
    },

    watch: {
        walletAddress: {
            handler(value) {
                this.setUser(value);
            },
            immediate: true,
        },

        rtlDirection: {
            handler(value) {
                this.setTextDirection(value);
            },
            immediate: true,
        },
    },

    created() {
        // this.$root._appNode = this;
        if (clientInfo.mobile) {
            document.body.classList.add('touch-device');
        }
    },

    methods: {
        async setUser(account) {
            if (!account) {
                return;
            }

            await setUser(account, !!getBearerToken());
        },

        setTextDirection(rtl = false) {
            document.documentElement.dir = rtl ? 'rtl' : '';
        },

        setAppTheme() {
            // AppTheme.setTheme('theme-dark');
        },
    },
};
</script>
