import { defer } from 'fantom-vue-components/src/utils';
import FAppTheme from 'fantom-vue-components/src/components/FAppTheme/FAppTheme.vue';
import { setMetaInfo } from '@/modules/app/document-meta.js';
import appConfig from '@/app.config.js';
import { wallet } from '@/plugins/wallet/Wallet.js';
import { signIn } from '@/modules/account/auth.js';

// import { vueApp } from '@/main.js';
// import { isAnyComponentChanged } from 'fantom-vue-components/src/utils/vue-helpers.js';
// import { translations } from 'fantom-vue-components/src/mixins/translations.js';

const APP_TITLE = appConfig.title;
let prevTheme = '';

/**
 * @param {Object} to
 * @param {Object} from
 * @param {function} next
 */
export function setRouteMetaInfo(to, from, next) {
    next();

    setMetaInfo({
        title: to?.meta?.title || APP_TITLE,
        description: to?.meta?.description || APP_TITLE,
    });
}

/**
 * @param {Object} to
 * @param {Object} from
 * @param {function} next
 */
export function setRouteTheme(to, from, next) {
    next();

    if (to.meta.theme) {
        defer(() => {
            prevTheme = FAppTheme.getTheme();
            FAppTheme.setTheme(to.meta.theme);
        });
    } else if (prevTheme) {
        FAppTheme.setTheme(prevTheme);
        prevTheme = '';
    }
}

/**
 * @param {Object} to
 * @param {Object} from
 * @param {function} next
 */
export async function authRoute(to, from, next) {
    if (to.meta.auth) {
        if ((wallet.user && wallet.user.logged) || !from.name) {
            next();
        } else {
            await signIn();

            if (wallet.user && wallet.user.logged) {
                next();
            }
        }
    } else {
        next();
    }
}

/*export function checkComponentsChange(_next) {
    if (vueApp && vueApp.$root) {
        if (!isAnyComponentChanged(vueApp.$root, translations._('componentChangeMessages'))) {
            _next();
        }
    } else {
        _next();
    }
}*/
