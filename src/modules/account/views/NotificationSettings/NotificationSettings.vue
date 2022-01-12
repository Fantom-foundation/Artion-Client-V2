<template>
    <div class="notificationsettings">
        <div class="notificationsettings_title">
            <h1 data-focus>{{ $t('notificationsettings.title') }}</h1>
        </div>
        <notification-settings-form />
    </div>
</template>

<script>
import NotificationSettingsForm from '@/modules/account/components/NotificationSettingsForm/NotificationSettingsForm.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

export default {
    name: 'NotificationSettings',

    components: { NotificationSettingsForm },

    mounted() {
        focusElem(this.$el);
    },
};
</script>

<style>
.notificationsettings_title h1 {
    margin-top: 0;
}
</style>
