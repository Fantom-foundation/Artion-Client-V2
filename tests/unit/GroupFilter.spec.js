/* eslint-disable no-undef */

import GroupFilter from '@/modules/nfts/components/GroupFilter/GroupFilter.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';
import { mount } from '../mocks/vue.js';
import { GROUP_FILTERS as groupFilters } from '@/common/constants/group-filter.js';
import { clickFComboBoxListItem } from '../helpers.js';

const VModelTest = getVModelComponent(GroupFilter);
const GROUP_FILTERS = groupFilters();
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

    it('should select the first value from GROUP_FILTERS by default', async () => {
        wrapper = createWrapper();

        await wrapper.vm.$nextTick();

        const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });
        await fCombobox.vm.$nextTick();

        expect(wrapper.props('selected')).toBe(GROUP_FILTERS[0].value);
        expect(fCombobox.props('value')).toBe(GROUP_FILTERS[0].value);
    });

    it('should select a group if `selected` prop is given', async () => {
        wrapper = createWrapper({ propsData: { selected: GROUP_FILTERS[1].value } });

        await wrapper.vm.$nextTick();

        const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });
        await fCombobox.vm.$nextTick();

        expect(fCombobox.props('value')).toBe(GROUP_FILTERS[1].value);
    });

    it('should emit `change` event with a group value as a payload when a group is selected', async () => {
        wrapper = createWrapper();

        await clickFComboBoxListItem(wrapper, 2);

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([GROUP_FILTERS[1].value]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, { propsData: { value: GROUP_FILTERS[1].value } });

        const groupFilter = wrapper.findComponent({ name: 'group-filter' });

        expect(groupFilter.props('selected')).toBe(GROUP_FILTERS[1].value);

        await clickFComboBoxListItem(wrapper, 1);

        expect(wrapper.vm.dValue).toBe(GROUP_FILTERS[0].value);
    });
});

/* eslint-enable no-undef */
