/* eslint-disable no-undef */

import { mount } from '../mocks/vue.js';
import NftFilters from '@/modules/nfts/components/NftFilters/NftFilters.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';

function getFilters() {
    return {
        category: 1,
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

        const fDetail = getFDetailById('test_nftfilters_categories', nftFilters);
        const categoriesFilter = fDetail.findComponent({ name: 'categories-filter' });

        const li = categoriesFilter.find('li');
        await li.trigger('click');

        expect(wrapper.vm.dValue).toEqual({ category: 0 });
    });
});

/* eslint-enable no-undef */
