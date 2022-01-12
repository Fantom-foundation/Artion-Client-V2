<template>
    <div class="accountfavorited">
        <h1 class="not-visible" data-focus>{{ $t('page.accountFavorited.title') }}</h1>

        <user-favorited-nft-list :user-address="userAddress" v-on="$listeners" />
    </div>
</template>

<script>
import UserFavoritedNftList from '@/modules/account/components/UserFavoritedNftList/UserFavoritedNftList.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

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

    mounted() {
        focusElem(this.$el);
    },
};
</script>
