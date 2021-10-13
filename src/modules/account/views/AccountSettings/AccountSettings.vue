<template>
    <div class="accountsettings">AccountSettings -> account: {{ address }}</div>
</template>

<script>
import { signIn } from '@/modules/account/auth.js';
import { mapState } from 'vuex';

export default {
    name: 'AccountSettings',

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
