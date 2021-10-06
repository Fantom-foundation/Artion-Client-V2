/* eslint-disable no-undef */

import { mount } from '../mocks/vue.js';
import NftFilterChips from '@/modules/nfts/components/NftFilterChips/NftFilterChips.vue';
import { GROUP_FILTERS as groupFilters } from '@/common/constants/group-filter.js';
import { SORT_BY_FILTERS as sortByFilters } from '@/common/constants/sort-by-filters.js';

const GROUP_FILTERS = groupFilters();
const SORT_BY_FILTERS = sortByFilters();

function getFilters() {
    return {
        category: 1,
        collections: ['rarity-crafting'],
        status: ['has_bids'],
        group: GROUP_FILTERS[1].value,
        sortBy: SORT_BY_FILTERS[1].value,
    };
}

const REMOVE_BUTTON_CLASS = '.flistbox_list_item_removebutton';
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { filters: getFilters() }, slots = {} } = {}) {
    return mount(NftFilterChips, {
        propsData,
        slots,
    });
}

async function deleteChip(wrapper, chipNum) {
    const li = wrapper.find(`li:nth-child(${chipNum})`);

    await li.find(`${REMOVE_BUTTON_CLASS}`).trigger('click');
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('NftFilterChips', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should properly set data for `AFilterChips` component', () => {
        wrapper = createWrapper();

        const aFilterChips = wrapper.findComponent({ name: 'a-filter-chips' });

        expect(aFilterChips.props('data')).toEqual([
            { value: 1, label: 'Collectibles', filterName: 'category' },
            { value: 'has_bids', label: 'Has Bids', filterName: 'status' },
            { value: 'single', label: 'Single Items', filterName: 'group' },
            { value: 'oldest', label: 'Oldest', filterName: 'sortBy' },
        ]);
    });

    it('should properly set filters when a filter chip is removed', async () => {
        wrapper = createWrapper();

        const aFilterChips = wrapper.findComponent({ name: 'a-filter-chips' });

        await deleteChip(aFilterChips, 2);

        expect(wrapper.vm.dFilters).toEqual({
            category: 1,
            collections: ['rarity-crafting'],
            group: GROUP_FILTERS[1].value,
            sortBy: SORT_BY_FILTERS[1].value,
        });
    });
});

/* eslint-enable no-undef */
