/* eslint-disable no-undef */

import { mount } from '@vue/test-utils';
import { destroyWrapper, getVModelComponent } from 'fantom-vue-components/src/utils/test.js';
import AFilterChips from '@/common/components/AFilterChips/AFilterChips.vue';

const REMOVE_BUTTON_CLASS = '.flistbox_list_item_removebutton';
let wrapper = null;

function getData() {
    return [
        {
            label: 'chip 1',
        },
        {
            id: 'chip2',
            label: 'chip 2',
        },
        {
            label: 'chip 3',
        },
    ];
}

const VModelTest = getVModelComponent(AFilterChips, { data: getData() });

function createWrapper({ propsData = { data: getData() }, slots = {} } = {}) {
    return mount(AFilterChips, {
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

describe('AFilterChips', () => {
    /*it('should render correctly', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });*/

    it('should emit `clear-all` event when "Clear all" button is clicked/pressed', async () => {
        wrapper = createWrapper();

        const eBtn = wrapper.find('[data-test-id="clear_all_btn"]');

        await eBtn.trigger('click');

        const emitted = wrapper.emitted('clear-all');

        expect(emitted).toBeTruthy();
    });

    it('should clear data and emit `change` event when "Clear all" button is clicked/pressed', async () => {
        wrapper = createWrapper();

        const eBtn = wrapper.find('[data-test-id="clear_all_btn"]');

        await eBtn.trigger('click');

        const emitted = wrapper.emitted('change');

        expect(emitted).toBeTruthy();
        expect(emitted[0]).toEqual([[]]);
    });

    it('should properly handle v-model', async () => {
        wrapper = mount(VModelTest, { propsData: { value: getData() } });

        const aFilterChips = wrapper.findComponent({ name: 'a-filter-chips' });

        expect(aFilterChips.props('data')).toEqual(getData());

        await deleteChip(aFilterChips, 3);

        const data = getData();
        data.splice(2, 1);
        expect(wrapper.vm.dValue).toEqual(data);
    });

    it('should hide "Clear all" button when there is no data', async () => {
        wrapper = createWrapper();

        wrapper.setProps({ data: [] });
        await wrapper.vm.$nextTick();

        const eBtn = wrapper.find('[data-test-id="clear_all_btn"]');

        expect(eBtn.isVisible()).toBeFalsy();
    });
});

/* eslint-enable no-undef */
