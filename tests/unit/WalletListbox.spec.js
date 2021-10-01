/* eslint-disable no-undef */

import { mount } from '../mocks/vue.js';
import WalletListbox from '@/modules/wallet/components/WalletListbox/WalletListbox.vue';

const WALLETS = [
    {
        icon: 'rainbow',
        id: 'metamask',
        label: 'Metamask',
    },
    {
        icon: 'rainbow',
        id: 'coinbase',
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
    return mount(WalletListbox, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('WalletListbox', () => {
    it('should display wallet list if `wallets` prop is given', () => {
        wrapper = createWrapper();

        const lis = wrapper.findAll('li');

        WALLETS.forEach((wallet, idx) => {
            expect(lis.at(idx).text()).toBe(wallet.label);
        });
    });

    it('should emit `wallet-pick` event with picked wallet object as a payload if wallet is picked', async () => {
        wrapper = createWrapper();

        const li = wrapper.find('li');

        await li.trigger('click');

        const emitted = wrapper.emitted('wallet-pick');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([WALLETS[0]]);
    });
});

/* eslint-enable no-undef */
