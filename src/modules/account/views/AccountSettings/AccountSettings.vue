<template>
    <div class="accountsettings">
        <aside class="accountsettings_sidebar">
            <div class="accountsettings_title">{{ $t('accountsettings.title') }}</div>
            <f-accordion-navigation iconset-component="app-iconset" :navigation="navigation" />
        </aside>
        <div class="accountsettings_view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import FAccordionNavigation from 'fantom-vue-components/src/components/FAccordionNavigation/FAccordionNavigation.vue';
import { authPageMixin } from '@/common/mixins/auth-page.js';

export default {
    name: 'AccountSettings',

    mixins: [authPageMixin],

    components: { FAccordionNavigation },

    data() {
        return {
            navigation: [
                { label: this.$t('accountsettings.profile'), route: 'account-settings-profile', icon: 'user' },
                {
                    label: this.$t('accountsettings.notifications'),
                    route: 'account-settings-notifications',
                    icon: 'notify',
                },
                // { label: this.$t('accountsettings.offers'), icon: 'tag' },
                { label: this.$t('accountsettings.appearance'), route: 'account-settings-appearance', icon: 'tag' },
            ],
        };
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
