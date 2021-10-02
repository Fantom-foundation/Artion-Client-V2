/* eslint-disable no-undef */

import SortByFilter from '@/modules/nfts/components/SortByFilter/SortByFilter.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';
import { mount } from '../mocks/vue.js';
import { SORT_BY_FILTERS as sortByFilters } from '@/common/constants/sort-by-filters.js';
import { clickFComboBoxListItem } from '../helpers.js';

const VModelTest = getVModelComponent(SortByFilter);
const SORT_BY_FILTERS = sortByFilters();
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = {}, slots = {} } = {}) {
    return mount(SortByFilter, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('SortByFilter', () => {
    /*it('should render categories correctly when `categories` prop is given', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should select the first value from SORT_BY_FILTERS by default', async () => {
        wrapper = createWrapper();

        await wrapper.vm.$nextTick();

        const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });
        await fCombobox.vm.$nextTick();

        expect(wrapper.props('selected')).toBe(SORT_BY_FILTERS[0].value);
        expect(fCombobox.props('value')).toBe(SORT_BY_FILTERS[0].value);
    });

    it('should select a value if `selected` prop is given', async () => {
        wrapper = createWrapper({ propsData: { selected: SORT_BY_FILTERS[1].value } });

        await wrapper.vm.$nextTick();

        const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });
        await fCombobox.vm.$nextTick();

        expect(fCombobox.props('value')).toBe(SORT_BY_FILTERS[1].value);
    });

    it('should emit `change` event with a sortby filter value as a payload when a sortby filter is selected', async () => {
        wrapper = createWrapper();

        await clickFComboBoxListItem(wrapper, 2);

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([SORT_BY_FILTERS[1].value]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, { propsData: { value: SORT_BY_FILTERS[1].value } });

        const sortbyFilter = wrapper.findComponent({ name: 'sort-by-filter' });

        expect(sortbyFilter.props('selected')).toBe(SORT_BY_FILTERS[1].value);

        await clickFComboBoxListItem(wrapper, 1);

        expect(wrapper.vm.dValue).toBe(SORT_BY_FILTERS[0].value);
    });
});

/* eslint-enable no-undef */
