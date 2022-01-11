import appConfig from '@/app.config.js';

import Main from '@/modules/app/views/Main/Main.vue';
import Home from '@/modules/app/views/Home/Home.vue';
import Page404 from '@/modules/app/views/Page404/Page404.vue';
import { i18n } from '@/plugins/vue-i18n.js';

export function getAppRoutes(mainChildren = [], rootChildren = []) {
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
                ...mainChildren,
            ],
        },
        ...rootChildren,
        {
            name: '404',
            path: '/404',
            component: Page404,
            meta: {
                title: i18n.t('page.404.title'),
            },
        },
        {
            name: 'n',
            path: '*',
            component: Page404,
            meta: {
                title: i18n.t('page.404.title'),
            },
            redirect: { name: '404' },
        },
    ];
}
