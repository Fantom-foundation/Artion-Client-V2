<template>
    <div class="accountfavorited">
        <user-favorited-nft-list :user-address="userAddress" :density="density" v-on="$listeners" />
    </div>
</template>

<script>
import UserFavoritedNftList from '@/modules/account/components/UserFavoritedNftList/UserFavoritedNftList.vue';
import { mapState } from 'vuex';
export default {
    name: 'AccountFavorited',

    components: { UserFavoritedNftList },

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
