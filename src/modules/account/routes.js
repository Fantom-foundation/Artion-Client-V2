import { i18n } from '@/plugins/vue-i18n.js';

import Account from '@/modules/account/views/Account/Account.vue';
import AccountSingleItems from '@/modules/account/views/AccountSingleItems/AccountSingleItems.vue';
import AccountBundles from '@/modules/account/views/AccountBundles/AccountBundles.vue';
import AccountFavorited from '@/modules/account/views/AccountFavorited/AccountFavorited.vue';
import AccountActivity from '@/modules/account/views/AccountActivity/AccountActivity.vue';
import AccountOffers from '@/modules/account/views/AccountOffers/AccountOffers.vue';
import AccountMyOffers from '@/modules/account/views/AccountMyOffers/AccountMyOffers.vue';
import AccountSettings from '@/modules/account/views/AccountSettings/AccountSettings.vue';
import AccountSettingsProfile from '@/modules/account/views/AccountSettingsProfile/AccountSettingsProfile.vue';
import NotificationSettings from '@/modules/account/views/NotificationSettings/NotificationSettings.vue';

export function getAccountRoutes() {
    return [
        {
            path: '/account/:address?',
            name: 'account',
            component: Account,
            redirect: { name: 'account-single-items' },
            meta: {
                title: i18n.t('page.account.title'),
            },
            children: [
                {
                    path: '/account/:address?/singleitems',
                    name: 'account-single-items',
                    component: AccountSingleItems,
                },
                {
                    path: '/account/:address?/bundles',
                    name: 'account-bundles',
                    component: AccountBundles,
                },
                {
                    path: '/account/:address?/favorited',
                    name: 'account-favorited',
                    component: AccountFavorited,
                },
                {
                    path: '/account/:address?/activity',
                    name: 'account-activity',
                    component: AccountActivity,
                },
                {
                    path: '/account/:address?/offers',
                    name: 'account-offers',
                    component: AccountOffers,
                },
                {
                    path: '/account/:address?/myoffers',
                    name: 'account-my-offers',
                    component: AccountMyOffers,
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
                    },
                },
                {
                    path: 'notifications',
                    name: 'account-settings-notifications',
                    component: NotificationSettings,
                },
            ],
        },
    ];
}
