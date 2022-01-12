<template>
    <div class="accountoffers">
        <h1 class="not-visible" data-focus>{{ $t('page.accountOffers.title') }}</h1>

        <account-offers-grid :user-address="userAddress" />
    </div>
</template>

<script>
import AccountOffersGrid from '@/modules/account/components/AccountOffersGrid/AccountOffersGrid.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';
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

    mounted() {
        focusElem(this.$el);
    },
};
</script>
