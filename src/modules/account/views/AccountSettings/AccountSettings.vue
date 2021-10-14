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
import { signIn } from '@/modules/account/auth.js';
import { mapState } from 'vuex';
export default {
    name: 'AccountSettings',

    components: { FAccordionNavigation },

    data() {
        return {
            navigation: [
                { label: this.$t('accountsettings.profile'), icon: 'user' },
                { label: this.$t('accountsettings.notifications'), icon: 'notify' },
                { label: this.$t('accountsettings.offers'), icon: 'tag' },
            ],
        };
    },

    computed: {
        ...mapState('wallet', {
            address: 'account',
        }),
    },

    async created() {
        if (!this.$wallet.loggedUser) {
            await signIn();
        }
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
