// import { i18n } from '@/plugins/vue-i18n.js';

import PGMain from '@/modules/pg/views/PGMain/PGMain.vue';
import appConfig from '@/app.config.js';
import PGHome from '@/modules/pg/views/PGHome/PGHome.vue';
import PGAccountSettings from '@/modules/pg/views/PGAccountSettings/PGAccountSettings.vue';
import PGMyNfts from './views/PGMyNfts/PGMyNfts';

export function getPGRoutes(mainPath = '/pg') {
    return [
        {
            name: 'pg',
            path: `${mainPath}`,
            component: PGMain,
            meta: {
                // title: i18n.t('page.pg.title'),
                theme: 'theme-pg',
            },
            redirect: { name: 'pg-home' },
            children: [
                {
                    path: '',
                    name: 'pg-home',
                    component: PGHome,
                    meta: {
                        title: appConfig.title,
                        theme: 'theme-pg',
                    },
                },
                {
                    path: 'account/settings',
                    name: 'pg-account-settings',
                    component: PGAccountSettings,
                    meta: {
                        theme: 'theme-pg',
                        auth: true,
                    },
                },
                {
                    path: 'account/my-nfts',
                    name: 'pg-account-my-nfts',
                    component: PGMyNfts,
                    meta: {
                        theme: 'theme-pg',
                        auth: false, // TEMPORARY
                    },
                },
            ],
        },
    ];
}
