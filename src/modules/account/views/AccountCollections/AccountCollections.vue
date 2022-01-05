<template>
    <div class="AccountCollections">
        <account-collections-grid :user-address="userAddress" />
    </div>
</template>

<script>
import AccountCollectionsGrid from '@/modules/account/components/AccountCollectionsGrid/AccountCollectionsGrid.vue';
import { moderatorPageMixin } from '@/common/mixins/moderator-page.js';

export default {
    name: 'AccountCollections',

    mixins: [moderatorPageMixin],

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
