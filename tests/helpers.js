export async function clickFComboBoxListItem(wrapper, itemNum = 1) {
    const fCombobox = wrapper.findComponent({ name: 'f-combo-box' });

    // show popover
    await fCombobox.find('button').trigger('click');
    await fCombobox.vm.$nextTick();

    const fListbox = wrapper.findComponent({ name: 'f-listbox' });
    const li = fListbox.find(`li:nth-child(${itemNum})`);

    await li.trigger('click');
}
