<template>
    <div class="accountbannedtokens">
        <h2 class="not-visible" data-focus>{{ $t('page.accountBannedTokens.title') }}</h2>

        <banned-token-list :user-address="userAddress" v-on="$listeners" />
    </div>
</template>

<script>
import BannedTokenList from '@/modules/account/components/BannedTokenList/BannedTokenList.vue';
import { moderatorPageMixin } from '@/common/mixins/moderator-page.js';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

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

    mounted() {
        focusElem(this.$el);
    },
};
</script>
