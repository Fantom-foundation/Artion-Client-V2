import Vuex from 'vuex';
import { appStore } from '@/modules/app/store';

export function store() {
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
