/* eslint-disable no-undef */

import { mount } from '../mocks/vue.js';
import NftFilters from '@/modules/nfts/components/NftFilters/NftFilters.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';

function getFilters() {
    return {
        category: 1,
        collections: ['rarity-crafting'],
        status: ['has_bids'],
    };
}

const VModelTest = getVModelComponent(NftFilters, { filters: getFilters() });
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { filters: getFilters() }, slots = {} } = {}) {
    return mount(NftFilters, {
        propsData,
        slots,
    });
}

function getFDetailById(id, wrapper) {
    return wrapper
        .findAllComponents({ name: 'f-details' })
        .filter(d => d.attributes('id') === id)
        .at(0);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('NftFilters', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should cointain closed sections by default', () => {
        wrapper = createWrapper({ propsData: { filters: {} } });

        const fDetails = wrapper.findAllComponents({ name: 'f-details' });

        for (let i = 0, len1 = fDetails.length; i < len1; i++) {
            expect(fDetails.at(i).props('open')).toBeFalsy();
        }
    });

    it('should open section "Categories" when `filters` contains "category" prop', async () => {
        wrapper = createWrapper();

        const fDetail = getFDetailById('test_nftfilters_categories', wrapper);
        await fDetail.vm.$nextTick();

        expect(fDetail.exists()).toBeTruthy();
        expect(fDetail.props('open')).toBeTruthy();
    });

    it('should select proper category when `filters` contains "category" prop', async () => {
        wrapper = createWrapper();

        const fDetail = getFDetailById('test_nftfilters_categories', wrapper);

        const categoriesFilter = fDetail.findComponent({ name: 'categories-filter' });

        expect(categoriesFilter.props('selected')).toBe(1);
    });

    it('should emit `change` event with filters object with property "category" as a payload when a category is selected', async () => {
        wrapper = createWrapper({
            propsData: {
                filters: {
                    category: 1,
                },
            },
        });

        const fDetail = getFDetailById('test_nftfilters_categories', wrapper);
        const categoriesFilter = fDetail.findComponent({ name: 'categories-filter' });

        const li = categoriesFilter.find('li');
        await li.trigger('click');

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([{ category: 0 }]);
    });

    it('should open section "Collections" when `filters` contains "collections" prop', async () => {
        wrapper = createWrapper();

        const fDetail = getFDetailById('test_nftfilters_collections', wrapper);
        await fDetail.vm.$nextTick();

        expect(fDetail.exists()).toBeTruthy();
        expect(fDetail.props('open')).toBeTruthy();
    });

    it('should select proper collection when `filters` contains "collections" prop', async () => {
        wrapper = createWrapper();

        const fDetail = getFDetailById('test_nftfilters_collections', wrapper);

        const collectionsFilter = fDetail.findComponent({ name: 'collections-filter' });

        expect(collectionsFilter.props('selected')).toEqual(['rarity-crafting']);
    });

    it('should emit `change` event with filters object with property "collections" as a payload when a category is selected', async () => {
        wrapper = createWrapper({
            propsData: {
                filters: {},
            },
        });

        const fDetail = getFDetailById('test_nftfilters_collections', wrapper);
        const collectionsFilter = fDetail.findComponent({ name: 'collections-filter' });

        const li = collectionsFilter.find('li');
        await li.trigger('click');

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([{ collections: ['default-artion-collection'] }]);
    });

    it('should open section "Status" when `filters` contains "status" prop', async () => {
        wrapper = createWrapper();

        const fDetail = getFDetailById('test_nftfilters_status', wrapper);
        await fDetail.vm.$nextTick();

        expect(fDetail.exists()).toBeTruthy();
        expect(fDetail.props('open')).toBeTruthy();
    });

    it('should select proper collection when `filters` contains "status" prop', async () => {
        wrapper = createWrapper();

        const fDetail = getFDetailById('test_nftfilters_status', wrapper);

        const statusFilter = fDetail.findComponent({ name: 'status-filter' });

        expect(statusFilter.props('selected')).toEqual(['has_bids']);
    });

    it('should emit `change` event with filters object with property "status" as a payload when a category is selected', async () => {
        wrapper = createWrapper({
            propsData: {
                filters: {},
            },
        });

        const fDetail = getFDetailById('test_nftfilters_status', wrapper);
        const statusFilter = fDetail.findComponent({ name: 'status-filter' });

        const li = statusFilter.find('li');
        await li.trigger('click');

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([{ status: ['buy_now'] }]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, {
            propsData: {
                value: {
                    category: 1,
                },
            },
        });

        const nftFilters = wrapper.findComponent({ name: 'nft-filters' });

        expect(nftFilters.props('filters')).toEqual({ category: 1 });

        let fDetail = getFDetailById('test_nftfilters_categories', nftFilters);
        let filter = fDetail.findComponent({ name: 'categories-filter' });
        let li = filter.find('li');
        await li.trigger('click');

        fDetail = getFDetailById('test_nftfilters_collections', nftFilters);
        filter = fDetail.findComponent({ name: 'collections-filter' });
        li = filter.find('li');
        await li.trigger('click');

        fDetail = getFDetailById('test_nftfilters_status', nftFilters);
        filter = fDetail.findComponent({ name: 'status-filter' });
        li = filter.find('li');
        await li.trigger('click');

        expect(wrapper.vm.dValue).toEqual({
            category: 0,
            collections: ['default-artion-collection'],
            status: ['buy_now'],
        });
    });
});

/* eslint-enable no-undef */
