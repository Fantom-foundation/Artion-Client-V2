/* eslint-disable no-undef */

import CollectionsFilter from '@/modules/nfts/components/CollectionsFilter/CollectionsFilter.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';
import { mount } from '../mocks/vue.js';

function getCollections() {
    return [
        {
            img: 'https://cloudflare-ipfs.com/ipfs/QmP8idjiQxFZ1Wpe61fSmi6jPTT48apPEx4QVKDhhWNWya',
            label: 'Default Artion Collection',
            value: 'default-artion-collection',
        },
        {
            img: 'https://cloudflare-ipfs.com/ipfs/QmTTvJNrWky6AikiPx6LsFBazRaX47z7XKiiyZVS7x4hHE',
            label: 'Rarity Crafting',
            value: 'rarity-crafting',
        },
        {
            img: 'https://cloudflare-ipfs.com/ipfs/QmcerMnM1z9fVoQxAbCi5HeHessCSrpDMd5YBGG54ti5YU',
            label: 'Pumpkittens',
            value: 'pumpkittens',
        },
    ];
}

const VModelTest = getVModelComponent(CollectionsFilter, { collections: getCollections() });
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { collections: getCollections() }, slots = {} } = {}) {
    return mount(CollectionsFilter, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('CollectionsFilter', () => {
    /*it('should render collections correctly when `collections` prop is given', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should select collection items when `selected` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                selected: ['rarity-crafting', 'pumpkittens'],
                collections: getCollections(),
            },
        });

        await wrapper.vm.$nextTick();

        const fListbox = wrapper.findComponent({ name: 'f-listbox' });
        await fListbox.vm.$nextTick();

        const lis = wrapper.findAll('li');

        expect(lis.at(0).attributes('aria-selected')).toBe('true');
        expect(lis.at(1).attributes('aria-selected')).toBe('true');
    });

    it('should properly deselect selected collection items', async () => {
        wrapper = createWrapper({
            propsData: {
                selected: ['rarity-crafting', 'pumpkittens'],
                collections: getCollections(),
            },
        });

        await wrapper.vm.$nextTick();

        const fListbox = wrapper.findComponent({ name: 'f-listbox' });
        await fListbox.vm.$nextTick();

        let lis = wrapper.findAll('li');

        await lis.at(0).trigger('click');
        await lis.at(1).trigger('click');

        await fListbox.vm.$nextTick();
        await wrapper.vm.$nextTick();

        lis = wrapper.findAll('li');

        expect(lis.at(0).attributes('aria-selected')).toBeFalsy();
        expect(lis.at(1).attributes('aria-selected')).toBeFalsy();
    });

    it('should emit `change` event with a collection values as a payload when a collection is selected', async () => {
        wrapper = createWrapper();

        const collections = getCollections();
        const lis = wrapper.findAll('li');

        await lis.at(1).trigger('click');

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([[collections[1].value]]);

        await lis.at(2).trigger('click');

        expect(emitted[1]).toEqual([[collections[1].value, collections[2].value]]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, { propsData: { value: ['rarity-crafting'] } });

        const collectionsFilter = wrapper.findComponent({ name: 'collections-filter' });

        expect(collectionsFilter.props('selected')).toEqual(['rarity-crafting']);

        await collectionsFilter.vm.$nextTick();

        const li = collectionsFilter.find('li');
        await li.trigger('click');

        expect(wrapper.vm.dValue).toEqual(['rarity-crafting', 'default-artion-collection']);
    });
});

/* eslint-enable no-undef */
