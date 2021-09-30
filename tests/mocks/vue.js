// import Vuex from 'vuex';
// import { appStore } from '@/modules/app/store';
import { i18n } from '@/plugins/vue-i18n.js';
// import { createLocalVue } from '@vue/test-utils';
import { mount as originalMount } from '@vue/test-utils';

/*
function store() {
    const store = { ...appStore.module };

    return {
        ...store,
        store: new Vuex.Store({
            modules: {
                app: store,
            },
        }),
    };
}
*/

export function mount(component, options = {}) {
    return originalMount(component, { ...options, i18n });
}

/**
 * @param {['store'|'i18n']} mocks
 */
/*
export function vueMock(mocks) {
    const localVue = createLocalVue();
    const usei18n = mocks.includes('i18n');
    let i18n = {};

    if (usei18n) {
        i18n = setupI18n(localVue);
    }

    return {
        ...(mocks.includes('store') ? store() : {}),
        ...i18n,
        // ...(usei18n ? i18n : {}),
        localVue,
    };
}
*/
