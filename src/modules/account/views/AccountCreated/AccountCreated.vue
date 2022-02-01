<template>
    <div class="accountcreated">
        <h2 class="not-visible" data-focus>{{ $t('page.accountCreated.title') }}</h2>

        <user-created-nft-list :user-address="userAddress" v-on="$listeners" />
    </div>
</template>

<script>
import UserCreatedNftList from '@/modules/account/components/UserCreatedNftList/UserCreatedNftList.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

export default {
    name: 'AccountCreated',

    components: { UserCreatedNftList },

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
