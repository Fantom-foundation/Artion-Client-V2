import { mapState } from 'vuex';
import { checkSignIn, getBearerToken } from '@/modules/account/auth.js';

export const authPageMixin = {
    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        walletAddress: {
            async handler(value) {
                if (value) {
                    // not logged in
                    if (!getBearerToken()) {
                        await checkSignIn(true);
                    }
                } else {
                    // redirect to the homepage
                    this.$router.push('/');
                }
            },
        },
    },

    created() {
        checkSignIn(true);
    },
};
