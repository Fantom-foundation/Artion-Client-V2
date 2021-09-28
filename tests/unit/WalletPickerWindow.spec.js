/* eslint-disable no-undef */

import { mount } from '@vue/test-utils';
import WalletPickerWindow from '@/modules/wallet/components/WalletPickerWindow/WalletPickerWindow.vue';

const WALLETS = [
    {
        icon: 'rainbow',
        code: 'metamask',
        label: 'Metamask',
    },
    {
        icon: 'rainbow',
        code: 'coinbase',
        label: 'Coinbase Wallet',
    },
];

let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { wallets: WALLETS }, slots = {} } = {}) {
    return mount(WalletPickerWindow, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('WalletPickerWindow', () => {
    it('should render window title correctly when `title` prop is given', async () => {
        wrapper = createWrapper({ propsData: { title: 'A window title', wallets: WALLETS } });
        wrapper.vm.show();
        await wrapper.vm.$nextTick();

        const fwindow = wrapper.findComponent({ name: 'f-window' });

        expect(fwindow.exists()).toBeTruthy();
        expect(fwindow.props().title).toBe('A window title');
    });

    it('should display wallet list when `wallets` prop is given', async () => {
        wrapper = createWrapper();
        wrapper.vm.show();
        await wrapper.vm.$nextTick();

        const lis = wrapper.findAll('li');

        WALLETS.forEach((wallet, idx) => {
            expect(lis.at(idx).text()).toBe(wallet.label);
        });
    });

    it('should emit `wallet-pick` event with picked wallet object as a payload when wallet is picked', async () => {
        wrapper = createWrapper();
        wrapper.vm.show();
        await wrapper.vm.$nextTick();

        const li = wrapper.find('li');
        await li.trigger('click');

        const emitted = wrapper.emitted('wallet-pick');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([WALLETS[0]]);
    });

    it('should hide window when a wallet is picked', async () => {
        wrapper = createWrapper();
        wrapper.vm.show();
        await wrapper.vm.$nextTick();

        const li = wrapper.find('li');
        await li.trigger('click');

        await wrapper.vm.$nextTick();

        const fwindow = wrapper.findComponent({ name: 'f-window' });

        expect(fwindow.exists()).toBeTruthy();
        expect(fwindow.vm.isVisible).toBeFalsy();
    });
});

/* eslint-enable no-undef */
