import { i18n } from '@/plugins/vue-i18n.js';

import Account from '@/modules/account/views/Account/Account.vue';
import AccountSingleItems from '@/modules/account/views/AccountSingleItems/AccountSingleItems.vue';
import AccountBundles from '@/modules/account/views/AccountBundles/AccountBundles.vue';
import AccountFavorited from '@/modules/account/views/AccountFavorited/AccountFavorited.vue';
import AccountActivity from '@/modules/account/views/AccountActivity/AccountActivity.vue';
import AccountOffers from '@/modules/account/views/AccountOffers/AccountOffers.vue';
import AccountMyOffers from '@/modules/account/views/AccountMyOffers/AccountMyOffers.vue';
import AccountSettings from '@/modules/account/views/AccountSettings/AccountSettings.vue';

export function getAccountRoutes() {
    return [
        {
            path: '/account',
            name: 'account',
            component: Account,
            meta: {
                title: i18n.t('page.account.title'),
            },
            children: [
                {
                    path: 'singleitems',
                    name: 'account-single-items',
                    component: AccountSingleItems,
                },
                {
                    path: 'bundles',
                    name: 'account-bundles',
                    component: AccountBundles,
                },
                {
                    path: 'favorited',
                    name: 'account-favorited',
                    component: AccountFavorited,
                },
                {
                    path: 'activity',
                    name: 'account-activity',
                    component: AccountActivity,
                },
                {
                    path: 'offers',
                    name: 'account-offers',
                    component: AccountOffers,
                },
                {
                    path: 'myoffers',
                    name: 'account-my-offers',
                    component: AccountMyOffers,
                },
            ],
        },
        {
            path: '/account/settings',
            name: 'account-settings',
            component: AccountSettings,
        },
    ];
}
