<template>
    <div class="accountcreated">
        <user-created-nft-list :user-address="userAddress" :density="density" v-on="$listeners" />
    </div>
</template>

<script>
import UserCreatedNftList from '@/modules/account/components/UserCreatedNftList/UserCreatedNftList.vue';
import { mapState } from 'vuex';

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

    computed: {
        ...mapState('app', {
            density: 'nftsDensity',
        }),
    },
};
</script>
