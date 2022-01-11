import { i18n } from '@/plugins/vue-i18n.js';

import Account from '@/modules/account/views/Account/Account.vue';
import AccountSingleItems from '@/modules/account/views/AccountSingleItems/AccountSingleItems.vue';
import AccountCreated from '@/modules/account/views/AccountCreated/AccountCreated.vue';
import AccountFavorited from '@/modules/account/views/AccountFavorited/AccountFavorited.vue';
import AccountActivity from '@/modules/account/views/AccountActivity/AccountActivity.vue';
import AccountHidden from '@/modules/account/views/AccountHidden/AccountHidden.vue';
import AccountOffers from '@/modules/account/views/AccountOffers/AccountOffers.vue';
import AccountMyOffers from '@/modules/account/views/AccountMyOffers/AccountMyOffers.vue';
import AccountSettings from '@/modules/account/views/AccountSettings/AccountSettings.vue';
import AccountSettingsProfile from '@/modules/account/views/AccountSettingsProfile/AccountSettingsProfile.vue';
import NotificationSettings from '@/modules/account/views/NotificationSettings/NotificationSettings.vue';
import AppearanceSettings from '@/modules/account/views/AppearanceSettings/AppearanceSettings.vue';
import AccountBannedTokens from '@/modules/account/views/AccountBannedTokens/AccountBannedTokens.vue';
import AccountCollections from '@/modules/account/views/AccountCollections/AccountCollections.vue';

export function getAccountRoutes() {
    return [
        {
            path: '/account/:address?',
            name: 'account',
            component: Account,
            redirect: { name: 'account-single-items' },
            children: [
                {
                    path: '/account/:address?/singleitems',
                    name: 'account-single-items',
                    component: AccountSingleItems,
                    meta: {
                        title: i18n.t('page.accountSingleItems.title'),
                    },
                },
                {
                    path: '/account/:address?/created',
                    name: 'account-created',
                    component: AccountCreated,
                    meta: {
                        title: i18n.t('page.accountCreated.title'),
                    },
                },
                {
                    path: '/account/:address?/favorited',
                    name: 'account-favorited',
                    component: AccountFavorited,
                    meta: {
                        title: i18n.t('page.accountFavorited.title'),
                    },
                },
                {
                    path: '/account/:address?/activity',
                    name: 'account-activity',
                    component: AccountActivity,
                    meta: {
                        title: i18n.t('page.accountActivity.title'),
                    },
                },
                {
                    path: '/account/:address?/hidden',
                    name: 'account-hidden',
                    component: AccountHidden,
                    meta: {
                        title: i18n.t('page.accountHidden.title'),
                    },
                },
                {
                    path: '/account/:address?/offers',
                    name: 'account-offers',
                    component: AccountOffers,
                    meta: {
                        title: i18n.t('page.accountOffers.title'),
                    },
                },
                {
                    path: '/account/:address?/myoffers',
                    name: 'account-my-offers',
                    component: AccountMyOffers,
                    meta: {
                        title: i18n.t('page.accountMyOffers.title'),
                    },
                },
                {
                    path: '/account/:address?/banned-tokens',
                    name: 'account-banned-tokens',
                    component: AccountBannedTokens,
                    meta: {
                        title: i18n.t('page.accountBannedTokens.title'),
                    },
                },
                {
                    path: '/account/:address?/collections',
                    name: 'account-collections',
                    component: AccountCollections,
                    meta: {
                        title: i18n.t('page.accountCollections.title'),
                    },
                },
            ],
        },
        {
            path: '/account/settings',
            name: 'account-settings',
            redirect: { name: 'account-settings-profile' },
            component: AccountSettings,
            meta: {
                //    auth: true, // needs authorization
                title: i18n.t('your_profile'),
            },
            children: [
                {
                    path: 'profile',
                    name: 'account-settings-profile',
                    component: AccountSettingsProfile,
                    meta: {
                        auth: true, // needs authorization
                        title: i18n.t('accountsettingsprofile.title'),
                    },
                },
                {
                    path: 'notifications',
                    name: 'account-settings-notifications',
                    component: NotificationSettings,
                    meta: {
                        title: i18n.t('notificationsettings.title'),
                    },
                },
                {
                    path: 'appearance',
                    name: 'account-settings-appearance',
                    component: AppearanceSettings,
                    meta: {
                        title: i18n.t('appearancesettings.title'),
                    },
                },
            ],
        },
    ];
}
