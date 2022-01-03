<template>
    <div class="AccountCollections">
        <account-collections-grid :user-address="userAddress" />
    </div>
</template>

<script>
import AccountCollectionsGrid from '@/modules/account/components/AccountCollectionsGrid/AccountCollectionsGrid.vue';

export default {
    name: 'AccountCollections',

    components: { AccountCollectionsGrid },

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
