<template>
    <div class="accountmyoffers">
        <h1 class="not-visible" data-focus>{{ $t('page.accountMyOffers.title') }}</h1>

        <account-my-offers-grid :user-address="userAddress" />
    </div>
</template>

<script>
import AccountMyOffersGrid from '@/modules/account/components/AccountMyOffersGrid/AccountMyOffersGrid.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';
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

    mounted() {
        focusElem(this.$el);
    },
};
</script>
