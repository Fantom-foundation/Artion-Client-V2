/* eslint-disable no-undef */

import { mount } from '../mocks/vue.js';
import NftListFilters from '@/modules/nfts/components/NftListFilters/NftListFilters.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';
import { GROUP_FILTERS as groupFilters } from '@/common/constants/group-filter.js';
import { SORT_BY_FILTERS as sortByFilters } from '@/common/constants/sort-by-filters.js';
import { clickFComboBoxListItem } from '../helpers.js';

const GROUP_FILTERS = groupFilters();
const SORT_BY_FILTERS = sortByFilters();

function getFilters() {
    return {
        group: GROUP_FILTERS[1].value,
        sortBy: SORT_BY_FILTERS[1].value,
    };
}

const VModelTest = getVModelComponent(NftListFilters, { filters: getFilters() });
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { filters: getFilters() }, slots = {} } = {}) {
    return mount(NftListFilters, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('NftListFilters', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should select proper group when `filters` contains "group" prop', async () => {
        wrapper = createWrapper();

        const groupFilter = wrapper.findComponent({ name: 'group-filter' });

        expect(groupFilter.props('selected')).toBe(GROUP_FILTERS[1].value);
    });

    it('should emit `change` event with filters object with property "group" as a payload when a group is selected', async () => {
        wrapper = createWrapper({
            propsData: {
                filters: {
                    group: GROUP_FILTERS[0].value,
                },
            },
        });

        const groupFilter = wrapper.findComponent({ name: 'group-filter' });

        await clickFComboBoxListItem(groupFilter, 2);

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([{ group: GROUP_FILTERS[1].value }]);
    });

    it('should select proper sortBy filter when `filters` contains "sortBy" prop', async () => {
        wrapper = createWrapper();

        const sortByFilter = wrapper.findComponent({ name: 'sort-by-filter' });

        expect(sortByFilter.props('selected')).toBe(SORT_BY_FILTERS[1].value);
    });

    it('should emit `change` event with filters object with property "sortBy" as a payload when a sortBy filter is selected', async () => {
        wrapper = createWrapper({
            propsData: {
                filters: {
                    sortBy: SORT_BY_FILTERS[0].value,
                },
            },
        });

        const sortByFilter = wrapper.findComponent({ name: 'sort-by-filter' });

        await clickFComboBoxListItem(sortByFilter, 2);

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([{ sortBy: SORT_BY_FILTERS[1].value }]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, {
            propsData: {
                value: {
                    group: GROUP_FILTERS[1].value,
                    sortBy: SORT_BY_FILTERS[1].value,
                },
            },
        });

        const nftFilters = wrapper.findComponent({ name: 'nft-list-filters' });

        expect(nftFilters.props('filters')).toEqual({
            group: GROUP_FILTERS[1].value,
            sortBy: SORT_BY_FILTERS[1].value,
        });

        const groupFilter = wrapper.findComponent({ name: 'group-filter' });
        await clickFComboBoxListItem(groupFilter, 1);

        const sortByFilter = wrapper.findComponent({ name: 'sort-by-filter' });
        await clickFComboBoxListItem(sortByFilter, 1);

        expect(wrapper.vm.dValue).toEqual({
            group: GROUP_FILTERS[0].value,
            sortBy: SORT_BY_FILTERS[0].value,
        });
    });
});

/* eslint-enable no-undef */
