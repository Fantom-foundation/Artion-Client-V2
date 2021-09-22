import Vue from 'vue';
import VueRouter from 'vue-router';
import appConfig from '../app.config.js';
// import { vueApp } from '@/main.js';
// import { isAnyComponentChanged } from 'fantom-vue-components/src/utils/vue-helpers.js';
// import { translations } from 'fantom-vue-components/src/mixins/translations.js';

/*
function checkComponentsChange(_next) {
    if (vueApp && vueApp.$root) {
        if (!isAnyComponentChanged(vueApp.$root, translations._('componentChangeMessages'))) {
            _next();
        }
    } else {
        _next();
    }
}
*/

export function setupRouter({ routes = [], beforeEach = null, vueInstance = Vue } = {}) {
    vueInstance.use(VueRouter);

    const router = new VueRouter({
        routes,
        mode: appConfig.routerHashMode ? 'hash' : 'history',
    });

    if (typeof beforeEach === 'function') {
        router.beforeEach(beforeEach);
    }

    /*router.beforeEach((_to, _from, _next) => {
        checkComponentsChange(_next);
    });*/

    return router;
}
