import { state, storeInLocalStorage } from './state.js';
import { mutations } from './mutations.js';

const namespace = 'wallet';

export const walletStore = {
    module: {
        namespaced: !!namespace,
        state: { ...state },
        mutations: { ...mutations },
    },
    storeInLocalStorage,
    namespace,
};
