/* eslint-disable no-undef */

import { mount } from '@vue/test-utils';
import AccountAvatar from '@/modules/account/components/AccountAvatar/AccountAvatar.vue';
import FPlaceholder from 'fantom-vue-components/src/components/FPlaceholder/FPlaceholder.vue';

// jest.mock('../../public/artion.svg');
// console.log();

let wrapper = null;

function destroyWrapper(wrapper) {
    // st = null;

    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = {} } = {}) {
    return mount(AccountAvatar, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('AccountAvatar', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should show the placeholders if the `loading` prop is set to `true`', () => {
        wrapper = createWrapper({ propsData: { loading: true } });

        expect(wrapper.findComponent(FPlaceholder).exists()).toBeTruthy();
    });

    it('should show image if `src` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                src: 'avatar.jpg',
            },
        });

        const eImg = wrapper.find('img');

        wrapper.vm.onImgLoad();

        await wrapper.vm.$nextTick();

        expect(eImg.exists()).toBeTruthy();
        expect(eImg.attributes().src).toBe('avatar.jpg');
    });

    xit('should hide placeholder and show image if `loading` prop is set to `true` and image is loaded', () => {});
});

/* eslint-enable no-undef */
