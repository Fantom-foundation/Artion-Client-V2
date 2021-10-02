/* eslint-disable no-undef */

import GroupFilter from '@/modules/nfts/components/GroupFilter/GroupFilter.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';
import { mount } from '../mocks/vue.js';

const VModelTest = getVModelComponent(GroupFilter);
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = {} } = {}) {
    return mount(GroupFilter, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('GroupFilter', () => {
    /*it('should render categories correctly when `categories` prop is given', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    xit('should select a group "all" by default', async () => {
        wrapper = createWrapper();

        await wrapper.vm.$nextTick();

        const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });
        await fCombobox.vm.$nextTick();

        expect(wrapper.props('selected')).toBe('all');
        expect(fCombobox.props('value')).toBe('all');
    });

    it('should select a group if `selected` prop is given', async () => {
        wrapper = createWrapper({ propsData: { selected: 'single' } });

        await wrapper.vm.$nextTick();

        const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });
        await fCombobox.vm.$nextTick();

        expect(fCombobox.props('value')).toBe('single');
    });

    it('should emit `change` event with a group value as a payload when a group is selected', async () => {
        wrapper = createWrapper();

        const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });

        // show popover
        await fCombobox.find('button').trigger('click');
        await fCombobox.vm.$nextTick();

        const fListbox = wrapper.findComponent({ name: 'f-listbox' });
        const li = fListbox.find('li:nth-child(2)');

        await li.trigger('click');

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual(['single']);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, { propsData: { value: 'single' } });

        const groupFilter = wrapper.findComponent({ name: 'group-filter' });

        expect(groupFilter.props('selected')).toBe('single');

        const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });

        // show popover
        await fCombobox.find('button').trigger('click');
        await fCombobox.vm.$nextTick();

        const fListbox = wrapper.findComponent({ name: 'f-listbox' });
        const li = fListbox.find('li:nth-child(1)');

        await li.trigger('click');

        expect(wrapper.vm.dValue).toBe('all');
    });
});

/* eslint-enable no-undef */
