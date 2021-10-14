import UnderMaintenance from '@/modules/app/views/UnderMaintenance/UnderMaintenance.vue';
import Page404 from '@/modules/app/views/Page404/Page404.vue';

import { getAppRoutes } from '@/modules/app/routes.js';
import { getNftsRoutes } from '@/modules/nfts/routes.js';
import { getAccountRoutes } from '@/modules/account/routes.js';
import { getCollectionsRoutes } from '@/modules/collections/routes.js';
import { getPGRoutes } from '@/modules/pg/routes.js';

export function getRoutes() {
    return getAppRoutes([...getNftsRoutes(), ...getAccountRoutes(), ...getCollectionsRoutes()], getPGRoutes());
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

export function getPGModuleRoutes() {
    return [
        ...getPGRoutes('/'),
        {
            name: '404',
            path: '/404',
            component: Page404,
            meta: {
                theme: 'theme-pg',
            },
        },
        {
            name: 'n',
            path: '*',
            component: Page404,
            redirect: { name: '404' },
            meta: {
                theme: 'theme-pg',
            },
        },
    ];
}
