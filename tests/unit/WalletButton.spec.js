/* eslint-disable no-undef */

import { mount } from '../mocks/vue.js';
import WalletButton from '@/modules/wallet/components/WalletButton/WalletButton.vue';
import FPlaceholder from 'fantom-vue-components/src/components/FPlaceholder/FPlaceholder.vue';
// import { vueMock } from '../mocks/vue.js';
// import { store } from '../mocks/appStore.js';
// import { localVue } from '../mocks/localVue.js';

const WALLET_ADDRESS = '0xc0ffee254729296a45a3885639AC7E10F9d54979';
let wrapper = null;
// let st = null;

function destroyWrapper(wrapper) {
    // st = null;

    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { themes: ['default', 'theme-dark'] }, slots = {} } = {}) {
    // st = store();
    // const vue = vueMock(['i18n']);

    return mount(WalletButton, {
        propsData,
        slots,
        // ...vue,
        // store: st.store,
        // localVue: localVue,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('WalletButton', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should show text "Connect Wallet" if no wallet is connected', () => {
        wrapper = createWrapper();

        expect(wrapper.text()).toBe('Connect Wallet');
    });

    it('should show the placeholders if the `loading` prop is set to `true`', () => {
        wrapper = createWrapper({ propsData: { loading: true } });

        expect(wrapper.findComponent(FPlaceholder).exists()).toBeTruthy();
    });

    it('should show wallet info if `wallet` prop is given', () => {
        wrapper = createWrapper({
            propsData: {
                wallet: {
                    address: WALLET_ADDRESS,
                    chain: 'Fantom',
                    avatar: '',
                },
            },
        });

        // expect(wrapper.text()).toContain(WALLET_ADDRESS);
        expect(wrapper.text()).toContain('Fantom');
    });

    it('should emit `click` event if button is clicked and the component is not in the loading state', async () => {
        wrapper = createWrapper();

        const eButton = wrapper.find('button');
        let emitted = null;

        await eButton.trigger('click');
        emitted = wrapper.emitted('click');
        expect(emitted).toBeTruthy();

        await wrapper.setProps({ loading: true });
        await eButton.trigger('click');
        emitted = wrapper.emitted('click');
        expect(emitted.length).toBe(1); // total emit count
    });
});

/* eslint-enable no-undef */
