import appConfig from '@/app.config.js';
import { i18n } from '@/plugins/vue-i18n.js';

import UnderMaintenance from '@/modules/app/views/UnderMaintenance/UnderMaintenance.vue';

import Home from '@/modules/app/views/Home/Home.vue';
import Main from '@/modules/app/views/Main/Main.vue';
import Explore from '@/modules/nfts/views/Explore/Explore.vue';
import Account from '@/modules/account/views/Account/Account.vue';
import AccountSingleItems from '@/modules/account/views/AccountSingleItems/AccountSingleItems.vue';
import AccountBundles from '@/modules/account/views/AccountBundles/AccountBundles.vue';
import AccountFavorited from '@/modules/account/views/AccountFavorited/AccountFavorited.vue';
import AccountActivity from '@/modules/account/views/AccountActivity/AccountActivity.vue';
import AccountOffers from '@/modules/account/views/AccountOffers/AccountOffers.vue';
import AccountMyOffers from '@/modules/account/views/AccountMyOffers/AccountMyOffers.vue';
import AccountSettings from '@/modules/account/views/AccountSettings/AccountSettings.vue';
import Collection from '@/modules/collections/views/Collection/Collection.vue';
import CollectionCreate from '@/modules/collections/views/CollectionCreate/CollectionCreate.vue';
import CollectionRegister from '@/modules/collections/views/CollectionRegister/CollectionRegister.vue';
import NftCreate from '@/modules/nfts/views/NftCreate/NftCreate.vue';
import Page404 from '@/modules/app/views/Page404/Page404.vue';
import NftDetail from '@/modules/nfts/views/NftDetail/NftDetail.vue';

export function getRoutes() {
    return [
        {
            path: '/',
            name: 'main',
            component: Main,
            redirect: { name: 'home' },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home,
                    meta: {
                        title: appConfig.title,
                    },
                },
                {
                    path: '/explore',
                    name: 'explore',
                    component: Explore,
                    meta: {
                        title: i18n.t('page.explore.title'),
                    },
                },
                {
                    path: '/explore/:tokenAddress/:tokenId',
                    name: 'nft-detail',
                    component: NftDetail,
                    meta: {
                        title: i18n.t('page.explore.title'),
                    },
                },
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
                        {
                            path: 'settings',
                            name: 'account-settings',
                            component: AccountSettings,
                        },
                    ],
                },
                {
                    path: '/collection',
                    name: 'collection',
                    component: Collection,
                    children: [
                        {
                            path: 'create',
                            name: 'collection-create',
                            component: CollectionCreate,
                        },
                        {
                            path: 'register',
                            name: 'collection-register',
                            component: CollectionRegister,
                        },
                    ],
                },
                {
                    path: '/create',
                    name: 'nft-create',
                    component: NftCreate,
                },
            ],
        },
        {
            name: '404',
            path: '/404',
            component: Page404,
        },
        {
            name: 'n',
            path: '*',
            component: Page404,
            redirect: { name: '404' },
        },
    ];
}

export function getMaintenanceRoutes() {
    return [
        {
            name: 'maintenance',
            path: '*',
            component: UnderMaintenance,
        },
    ];
}
