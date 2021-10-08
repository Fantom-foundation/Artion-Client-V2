import appConfig from '@/app.config.js';

import Main from '@/modules/app/views/Main/Main.vue';
import Home from '@/modules/app/views/Home/Home.vue';
import Page404 from '@/modules/app/views/Page404/Page404.vue';

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
        },
        {
            name: 'n',
            path: '*',
            component: Page404,
            redirect: { name: '404' },
        },
    ];
}
