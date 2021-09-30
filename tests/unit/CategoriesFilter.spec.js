/* eslint-disable no-undef */

import CategoriesFilter from '@/modules/nfts/components/CategoriesFilter/CategoriesFilter.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';
import { mount } from '../mocks/vue.js';

function getCategories() {
    return [
        {
            id: 0,
            icon: 'rainbow',
            label: 'category.art',
        },
        {
            id: 1,
            icon: 'bear',
            label: 'category.collectibles',
        },
        {
            id: 2,
            icon: 'soccerball',
            label: 'category.sports',
        },
    ];
}

const VModelTest = getVModelComponent(CategoriesFilter, { categories: getCategories() });
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { categories: getCategories() }, slots = {} } = {}) {
    return mount(CategoriesFilter, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('CategoriesFilter', () => {
    /*it('should render categories correctly when `categories` prop is given', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should select a category by id if `selected` prop is given', async () => {
        wrapper = createWrapper({ propsData: { selected: 1, categories: getCategories() } });

        await wrapper.vm.$nextTick();

        const fListbox = wrapper.findComponent({ name: 'f-listbox' });
        await fListbox.vm.$nextTick();

        const lis = wrapper.findAll('li');

        expect(lis.at(1).attributes('aria-selected')).toBe('true');
    });

    /*it('should change the category icon when a category is selected', async () => {
        wrapper = createWrapper();

        const li = wrapper.find('li');
        await li.trigger('click');

        expect(wrapper.vm.dCategories[0].icon !== 'rainbow').toBeTruthy();
    });*/

    it('should emit `change` event with a category id as a payload when a category is selected', async () => {
        wrapper = createWrapper();

        const li = wrapper.find('li');
        await li.trigger('click');

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([0]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, { propsData: { value: 1 } });

        const categoriesFilter = wrapper.findComponent({ name: 'categories-filter' });

        expect(categoriesFilter.props('selected')).toBe(1);

        const li = categoriesFilter.find('li');
        await li.trigger('click');

        expect(wrapper.vm.dValue).toBe(0);
    });
});

/* eslint-enable no-undef */
