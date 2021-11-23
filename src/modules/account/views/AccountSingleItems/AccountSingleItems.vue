<template>
    <div class="accountsingleitems">
        <user-collected-list :user-address="userAddress" v-on="$listeners" />
    </div>
</template>

<script>
import UserCollectedList from '@/modules/account/components/UserCollectedList/UserCollectedList.vue';

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
};
</script>
