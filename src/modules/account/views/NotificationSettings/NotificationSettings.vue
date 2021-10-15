<template>
    <div class="notificationsettings">
        <div class="notificationsettings_title">
            <h1>{{ $t('notificationsettings.title') }}</h1>
        </div>
        <notification-settings-form />
    </div>
</template>
<script>
import NotificationSettingsForm from '@/modules/account/components/NotificationSettingsForm/NotificationSettingsForm.vue';
export default {
    name: 'NotificationSettings',
    components: { NotificationSettingsForm },
};
</script>
<style>
.notificationsettings_title h1 {
    margin-top: 0;
}
</style>
