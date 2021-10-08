import UnderMaintenance from '@/modules/app/views/UnderMaintenance/UnderMaintenance.vue';

import { getAppRoutes } from '@/modules/app/routes.js';
import { getNftsRoutes } from '@/modules/nfts/routes.js';
import { getAccountRoutes } from '@/modules/account/routes.js';
import { getCollectionsRoutes } from '@/modules/collections/routes.js';

export function getRoutes() {
    return getAppRoutes([...getNftsRoutes(), ...getAccountRoutes(), ...getCollectionsRoutes()]);
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
