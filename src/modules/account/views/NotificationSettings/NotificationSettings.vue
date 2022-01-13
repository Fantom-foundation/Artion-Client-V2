<template>
    <section class="notificationsettings" :aria-labelledby="id">
        <div class="notificationsettings_title">
            <h1 :id="id" data-focus>{{ $t('notificationsettings.title') }}</h1>
        </div>
        <notification-settings-form />
    </section>
</template>

<script>
import NotificationSettingsForm from '@/modules/account/components/NotificationSettingsForm/NotificationSettingsForm.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';
import { getUniqueId } from 'fantom-vue-components/src/utils';

export default {
    name: 'NotificationSettings',

    components: { NotificationSettingsForm },

    data() {
        return {
            id: getUniqueId(),
        };
    },

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
