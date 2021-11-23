<template>
    <div class="accountcreated">
        <user-created-nft-list :user-address="userAddress" v-on="$listeners" />
    </div>
</template>

<script>
import UserCreatedNftList from '@/modules/account/components/UserCreatedNftList/UserCreatedNftList.vue';

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
};
</script>
