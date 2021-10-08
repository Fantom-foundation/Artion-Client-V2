import Vue from 'vue';
import VueRouter from 'vue-router';
import appConfig from '../app.config.js';

export function setupRouter({ routes = [], middlewares = [], vueInstance = Vue } = {}) {
    vueInstance.use(VueRouter);

    const router = new VueRouter({
        routes,
        mode: appConfig.routerHashMode ? 'hash' : 'history',
    });

    middlewares.forEach(middleware => {
        if (typeof middleware === 'function') {
            router.beforeEach(middleware);
        }
    });

    return router;
}
