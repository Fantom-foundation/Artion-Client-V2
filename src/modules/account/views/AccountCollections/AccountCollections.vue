<template>
    <div class="AccountCollections">
        <h2 class="not-visible" data-focus>{{ $t('page.accountCollections.title') }}</h2>

        <account-collections-grid :user-address="userAddress" />
    </div>
</template>

<script>
import AccountCollectionsGrid from '@/modules/account/components/AccountCollectionsGrid/AccountCollectionsGrid.vue';
import { moderatorPageMixin } from '@/common/mixins/moderator-page.js';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

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

    mounted() {
        focusElem(this.$el);
    },
};
</script>
