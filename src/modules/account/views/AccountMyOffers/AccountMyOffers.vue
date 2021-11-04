<template>
    <div class="accountmyoffers">
        <account-my-offers-grid :user-address="userAddress" />
    </div>
</template>

<script>
import AccountMyOffersGrid from '@/modules/account/components/AccountMyOffersGrid/AccountMyOffersGrid.vue';
export default {
    name: 'AccountMyOffers',

    components: { AccountMyOffersGrid },

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
