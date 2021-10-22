<template>
    <div class="pg-account-settings">
        <h2 class="h2 pg-account-settings__header">{{ $t('pgAccountSettings.accountSettings') }}</h2>

        <div class="pg-account-settings__form">
            <account-profile-form />
        </div>
    </div>
</template>

<script>
import AccountProfileForm from '@/modules/account/components/AccountProfileForm/AccountProfileForm.vue';
import { authPageMixin } from '@/common/mixins/auth-page.js';

export default {
    name: 'PGAccountSettings',

    mixins: [authPageMixin],

    components: { AccountProfileForm },
};
</script>

<style lang="scss">
@use "style";
</style>
