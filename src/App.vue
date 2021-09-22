<template>
    <div id="app">
        <!--        <app-language />-->

        <router-view />

        <f-app-theme />
        <f-tooltip />
        <f-notifications
            strategy="newest-first"
            with-icon
            position="bottom-right"
            hide-on-click
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
        />
        <f-network-status />
    </div>
</template>

<script>
import appConfig from '@/app.config.js';
import FNetworkStatus from 'fantom-vue-components/src/components/FNetworkStatus/FNetworkStatus.vue';
// import FNetworkStatus from 'fantom-vue-components/src/components/FNetworkStatus/FNetworkStatus.vue';
import FNotifications from 'fantom-vue-components/src/components/FNotifications/FNotifications.vue';
import FTooltip from 'fantom-vue-components/src/components/FTooltip/FTooltip.vue';
import FAppTheme from 'fantom-vue-components/src/components/FAppTheme/FAppTheme.vue';

// import { FAppTheme } from '@skavel/fantom-vue-ui';
// import FAppTheme from '@skavel/fantom-vue-ui/src/components/FAppTheme/FAppTheme.vue';
// import AppLanguage from '@/modules/app/components/AppLanguage/AppLanguage.vue';

export default {
    name: 'App',

    components: { FNotifications, FNetworkStatus, FTooltip, FAppTheme },

    data() {
        return {
            appTitle: appConfig.name,
        };
    },

    /*
    created() {
        this.$root._appNode = this;
    },
*/

    methods: {
        setAppTheme() {
            // AppTheme.setTheme('theme-dark');
        },
    },
};
</script>
