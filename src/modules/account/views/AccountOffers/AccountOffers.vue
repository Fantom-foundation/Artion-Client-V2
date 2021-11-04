<template>
    <div class="accountoffers">
        <account-offers-grid :user-address="userAddress" />
    </div>
</template>

<script>
import AccountOffersGrid from '@/modules/account/components/AccountOffersGrid/AccountOffersGrid.vue';
export default {
    name: 'AccountOffers',

    components: { AccountOffersGrid },

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
