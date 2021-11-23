<template>
    <div class="accountfavorited">
        <user-favorited-nft-list :user-address="userAddress" v-on="$listeners" />
    </div>
</template>

<script>
import UserFavoritedNftList from '@/modules/account/components/UserFavoritedNftList/UserFavoritedNftList.vue';

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
};
</script>
