<template>
    <div class="accountsettingsprofile">
        <div class="accountsettingsprofile_title">
            <h1>{{ $t('accountsettingsprofile.title') }}</h1>
            <div class="accountsettingsprofile_preview">
                <!--                Preview-->
            </div>
        </div>
        <AccountProfileForm />
    </div>
</template>
<script>
import AccountProfileForm from '@/modules/account/components/AccountProfileForm/AccountProfileForm.vue';
export default {
    name: 'AccountSettingsProfile',
    components: { AccountProfileForm },
};
</script>

<style lang="scss">
.accountsettingsprofile {
    &_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            margin-top: 0;
        }
    }

    &_preview {
    }
}
</style>
