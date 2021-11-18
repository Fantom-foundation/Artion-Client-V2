<template>
    <f-form v-model="values" class="notificationsettingsform" @submit="onFormSubmit">
        <div class="notificationsettingsform_lists">
            <div class="notificationsettingsform_list">
                <f-form-input name="sNotification" type="checkbox" label="Your Activity Notifications" />
                <div class="notificationsettingsform_wrap">
                    <div
                        class="notificationsettingsform_item"
                        v-for="(value, name, index) in myNotifications"
                        :key="index + name"
                    >
                        <div class="notificationsettingsform_checkbox">
                            <f-form-input :name="name" type="checkbox" :disabled="!yourActivity" />
                        </div>
                        <div class="notificationsettingsform_content" @click="onNotificationClick">
                            <div class="notificationsettingsform_title">{{ $t(`notifications.${name}`) }}</div>
                            <div class="notificationsettingsform_desc">{{ $t(`notifications.${name}` + 'Desc') }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="notificationsettingsform_list">
                <f-form-input name="fNotification" type="checkbox" label="Follower Activity Notifications" />
                <div class="notificationsettingsform_wrap">
                    <div
                        class="notificationsettingsform_item"
                        v-for="(value, name, index) in followerNotifications"
                        :key="index + name"
                    >
                        <div class="notificationsettingsform_checkbox">
                            <f-form-input :name="name" type="checkbox" :disabled="!followerActivity" />
                        </div>
                        <div class="notificationsettingsform_content" @click="onNotificationClick">
                            <div class="notificationsettingsform_title">{{ $t(`notifications.${name}`) }}</div>
                            <div class="notificationsettingsform_desc">{{ $t(`notifications.${name}` + 'Desc') }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="notificationsettingsform_price">
            <div class="notificationsettingsform_price_title">{{ $t('notificationsettingsform.minimumBid') }}</div>
            <div class="notificationsettingsform_price_desc">
                {{ $t('notificationsettingsform.recieveWhenPriceEqualOrGreater') }}
            </div>
            <f-form-input
                type="a-price-field"
                :currencies="payTokens"
                :validator="priceValidator"
                validate-on-input
                name="price"
            />
        </div> -->
        <div class="notificationsettingsform_btn">
            <f-button type="submit">{{ $t('notifications.save') }}</f-button>
        </div>
    </f-form>
</template>
<script>
//import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import { getNotificationSettings } from '@/modules/account/queries/notifications.js';
import { updateNotificationSettings } from '@/modules/account/mutations/notifications.js';
import { sNotifications, fNotifications } from '@/common/constants/notifications.js';
import { getBearerToken, signIn } from '@/modules/account/auth.js';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { clone, isObject } from 'fantom-vue-components/src/utils';
export default {
    name: 'NotificationSettingsForm',

    mixins: [eventBusMixin],

    data() {
        return {
            values: {},
            oldValues: null,
            //payTokens: [],
            myNotifications: null,
            followerNotifications: null,
        };
    },

    created() {
        this.init();
    },

    computed: {
        yourActivity() {
            return this.values.sNotification;
        },

        followerActivity() {
            return this.values.fNotification;
        },
    },

    methods: {
        async init() {
            //this.payTokens = await PAY_TOKENS_WITH_PRICES();
            let notifications = await getNotificationSettings();
            this.myNotifications = sNotifications();
            this.followerNotifications = fNotifications();

            if (notifications !== null && isObject(notifications)) {
                this.values = clone(notifications);
            }
        },

        // priceValidator(value) {
        //     const val = parseFloat(value);

        //     if (isNaN(val) || val <= 0) {
        //         return this.$t('nftmakeofferform.nonZeroPrice');
        //     } else if (this.accountBalance < val) {
        //         return this.$t('nftmakeofferform.insufficientBalance');
        //     }

        //     return '';
        // },

        onNotificationClick(e) {
            const item = e.target.closest('.notificationsettingsform_item');
            if (item) item.querySelector('.cr_check').click();
        },

        async checkWalletConnection() {
            if (!this.$wallet.connected) {
                const payload = {};
                this._eventBus.emit('show-wallet-picker', payload);
                await payload.promise;
            }
        },

        async onFormSubmit(data) {
            let ok = true;
            await this.checkWalletConnection();
            if (!getBearerToken()) {
                ok = await signIn();
            }
            if (ok) {
                console.log(data.values);
                let values = {};
                if (!this.yourActivity) Object.keys(sNotifications()).forEach(name => this.values[name] = false);
                if (!this.followerActivity) Object.keys(fNotifications()).forEach(name => this.values[name] = false);

                Object.assign(values, data.values);
                Object.assign(values, this.values);

                let output = await updateNotificationSettings(values);
                if (output) {
                    this.$notifications.add({
                        type: 'success',
                        text: this.$t('notifications.successMessage'),
                    });
                }
            }
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
