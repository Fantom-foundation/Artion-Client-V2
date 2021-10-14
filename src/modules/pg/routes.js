// import { i18n } from '@/plugins/vue-i18n.js';

import PGMain from '@/modules/pg/views/PGMain/PGMain.vue';

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
        },
    ];
}
