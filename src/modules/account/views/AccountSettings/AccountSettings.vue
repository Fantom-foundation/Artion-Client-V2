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
import { documentMeta } from '@/modules/app/DocumentMeta.js';
import { mapState } from 'vuex';
import { getUser } from '@/modules/account/queries/user.js';

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
                    // icon: 'notify',
                },
                // { label: this.$t('accountsettings.offers'), icon: 'tag' },
                {
                    label: this.$t('accountsettings.appearance'),
                    route: 'account-settings-appearance',
                    // icon: 'tag',
                },
            ],
            user: {},
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        $route() {
            this.setMetaInfo();
        },
    },

    async created() {
        this.user = await getUser(this.walletAddress);

        this.setMetaInfo();
    },

    methods: {
        setMetaInfo() {
            const sTitle = documentMeta.getSplittedTitle();
            const { user } = this;

            documentMeta.setMetaInfo({
                title: `${sTitle[0]} | Account ${user.username || user.address}`,
            });
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
