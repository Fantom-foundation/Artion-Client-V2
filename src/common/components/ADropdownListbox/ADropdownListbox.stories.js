import ADropdownListbox from '@/common/components/ADropdownListbox/ADropdownListbox.vue';

export default {
    title: 'Components/ADropdownListbox',
    components: ADropdownListbox,
};

export const Default = () => ({
    components: { ADropdownListbox },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-dropdown-listbox :data="data">
                <template #button-label="{ item }">
                    <div class="flex ali-center">
                        <f-image v-if="item.img" size="24px" :src="item.img" :alt="item.label" />
                        <b>{{ item.label }}</b>
                    </div>
                </template>
                <template #item="{ item }">
                    <div class="flex ali-center">
                        <f-image v-if="item.img" size="24px" :src="item.img" :alt="item.label" />
                        <b>{{ item.label }}</b>
                    </div>
                </template>
            </a-dropdown-listbox>
        </div>
    `,
    data() {
        return {
            data: [
                { label: 'item 1', value: '10', img: 'img/tmp/fantom.svg' },
                { label: 'item 2', id: 'myid', value: '20', img: 'img/tmp/fantom.svg' },
                { label: 'item 3', value: '30', img: 'img/tmp/fantom.svg' },
                { label: 'item 4', value: '40', img: 'img/tmp/fantom.svg' },
                { label: 'item 5', value: '50', img: 'img/tmp/fantom.svg' },
                { label: 'item 6', value: '60', img: 'img/tmp/fantom.svg' },
            ],
        };
    },
});
