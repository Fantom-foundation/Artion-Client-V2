import { mapState } from 'vuex';
import { checkSignIn, getBearerToken } from '@/modules/account/auth.js';
import { isLoggedUserModerator } from '@/modules/account/queries/user.js';

export const moderatorPageMixin = {
    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        walletAddress: {
            async handler(value) {
                let redirect = false;

                if (value) {
                    console.log('???', value);
                    // not logged in
                    if (!getBearerToken()) {
                        await checkSignIn(true, true);
                    } else if (!(await isLoggedUserModerator())) {
                        redirect = true;
                    }
                } else {
                    redirect = true;
                }

                // redirect to the homepage
                if (redirect) {
                    this.$router.push('/');
                }
            },
        },
    },

    created() {
        checkSignIn(true, true);
    },
};
