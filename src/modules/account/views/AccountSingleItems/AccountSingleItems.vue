<template>
    <div class="accountsingleitems">
        <h2 class="not-visible" data-focus>{{ $t('page.accountSingleItems.title') }}</h2>

        <user-collected-list :user-address="userAddress" v-on="$listeners" />
    </div>
</template>

<script>
import UserCollectedList from '@/modules/account/components/UserCollectedList/UserCollectedList.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

export default {
    name: 'AccountSingleItems',

    components: { UserCollectedList },

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
