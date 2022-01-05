<template>
    <div class="accountbannedtokens">
        <banned-token-list :user-address="userAddress" v-on="$listeners" />
    </div>
</template>

<script>
import BannedTokenList from '@/modules/account/components/BannedTokenList/BannedTokenList.vue';
import { moderatorPageMixin } from '@/common/mixins/moderator-page.js';

export default {
    name: 'AccountBannedTokens',

    mixins: [moderatorPageMixin],

    components: { BannedTokenList },

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
