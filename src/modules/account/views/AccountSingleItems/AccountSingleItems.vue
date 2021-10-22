<template>
    <div class="accountsingleitems">
        <user-collected-list :user-address="userAddress" :density="density" v-on="$listeners" />
    </div>
</template>

<script>
import UserCollectedList from '@/modules/account/components/UserCollectedList/UserCollectedList.vue';
import { mapState } from 'vuex';
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

    computed: {
        ...mapState('app', {
            density: 'nftsDensity',
        }),
    },
};
</script>
