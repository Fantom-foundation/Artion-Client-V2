import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import appConfig from '@/app.config.js';
import { appStore } from '@/modules/app/store';
import { pgStore } from '@/modules/pg/store';
import { walletStore } from '@/plugins/wallet/store/index.js';

const _modules = {
    [appStore.namespace]: appStore,
    [pgStore.namespace]: pgStore,
    [walletStore.namespace]: walletStore,
};
const plugins = [];
const modules = {};

// prepare modules for vuex store
Object.keys(_modules).forEach(_moduleName => {
    modules[_moduleName] = _modules[_moduleName].module;
});

const vuexLocalStorage = new VuexPersist({
    // The key to store the state on in the storage provider.
    key: `vuex-${appConfig.code}`,
    storage: window.localStorage,
    // Function that passes the state and returns the state with only the Objects you want to store.
    reducer: _state => {
        const store = {};

        Object.keys(_modules).forEach(_moduleName => {
            const storeInLocalStorage = _modules[_moduleName].storeInLocalStorage;
            const state = _state[_moduleName];

            if (state && storeInLocalStorage && storeInLocalStorage.length > 0) {
                store[_moduleName] = {};

                storeInLocalStorage.forEach(_key => {
                    if (_key in state) {
                        store[_moduleName][_key] = state[_key];
                    }
                });
            }
        });

        return store;
    },
});

plugins.push(vuexLocalStorage.plugin);

Vue.use(Vuex);

export default new Vuex.Store({
    plugins,
    modules,
});
