import { state, storeInLocalStorage } from './state.js';
import { getters } from './getters.js';
import { mutations } from './mutations.js';

const namespace = 'app';

export const appStore = {
    module: {
        namespaced: !!namespace,
        state: { ...state },
        getters: { ...getters },
        mutations: { ...mutations },
    },
    storeInLocalStorage,
    namespace,
};
