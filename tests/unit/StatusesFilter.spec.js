/* eslint-disable no-undef */

import StatusFilter from '@/modules/nfts/components/StatusFilter/StatusFilter.vue';
import { getVModelComponent } from 'fantom-vue-components/src/utils/test.js';
import { mount } from '../mocks/vue.js';
import { STATUSES } from '@/common/constants/statuses.js';

const VModelTest = getVModelComponent(StatusFilter, { statuses: STATUSES() });
let wrapper = null;

function destroyWrapper(wrapper) {
    if (wrapper) {
        wrapper.destroy();
        wrapper = null;
    }
}

function createWrapper({ propsData = { statuses: STATUSES() }, slots = {} } = {}) {
    return mount(StatusFilter, {
        propsData,
        slots,
    });
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('StatusFilter', () => {
    /*it('should render statuses correctly when `statuses` prop is given', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should select status items when `selected` prop is given', async () => {
        wrapper = createWrapper({
            propsData: {
                selected: ['has_bids', 'has_offers'],
                statuses: STATUSES(),
            },
        });

        await wrapper.vm.$nextTick();

        const fListbox = wrapper.findComponent({ name: 'f-listbox' });
        await fListbox.vm.$nextTick();

        const lis = wrapper.findAll('li');

        expect(lis.at(1).attributes('aria-selected')).toBe('true');
        expect(lis.at(2).attributes('aria-selected')).toBe('true');
    });

    it('should properly deselect selected status items', async () => {
        wrapper = createWrapper({
            propsData: {
                selected: ['has_bids', 'has_offers'],
                statuses: STATUSES(),
            },
        });

        await wrapper.vm.$nextTick();

        const fListbox = wrapper.findComponent({ name: 'f-listbox' });
        await fListbox.vm.$nextTick();

        let lis = wrapper.findAll('li');

        await lis.at(1).trigger('click');
        await lis.at(2).trigger('click');

        await fListbox.vm.$nextTick();
        await wrapper.vm.$nextTick();

        lis = wrapper.findAll('li');

        expect(lis.at(1).attributes('aria-selected')).toBeFalsy();
        expect(lis.at(2).attributes('aria-selected')).toBeFalsy();
    });

    it('should emit `change` event with a status ids as a payload when a status is selected', async () => {
        wrapper = createWrapper();

        const statuses = STATUSES();
        const lis = wrapper.findAll('li');

        await lis.at(1).trigger('click');

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([[statuses[1].id]]);

        await lis.at(2).trigger('click');

        expect(emitted[1]).toEqual([[statuses[1].id, statuses[2].id]]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, { propsData: { value: ['has_bids'] } });

        const statusesFilter = wrapper.findComponent({ name: 'status-filter' });

        expect(statusesFilter.props('selected')).toEqual(['has_bids']);

        await statusesFilter.vm.$nextTick();

        const li = statusesFilter.find('li');
        await li.trigger('click');

        expect(wrapper.vm.dValue).toEqual(['has_bids', 'buy_now']);
    });
});

/* eslint-enable no-undef */
