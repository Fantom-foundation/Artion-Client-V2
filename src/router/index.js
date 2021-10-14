import Vue from 'vue';
import VueRouter from 'vue-router';
import appConfig from '../app.config.js';

export function setupRouter({ routes = [], middlewares = [], vueInstance = Vue } = {}) {
    vueInstance.use(VueRouter);

    const router = new VueRouter({
        routes,
        mode: appConfig.routerHashMode ? 'hash' : 'history',

        scrollBehavior: function(to) {
            if (to.hash) {
                return {
                    selector: to.hash,
                    behavior: 'smooth',
                };
            }

            return { x: 0, y: 0 };
        },
    });

    middlewares.forEach(middleware => {
        if (typeof middleware === 'function') {
            router.beforeEach(middleware);
        }
    });

    return router;
}
