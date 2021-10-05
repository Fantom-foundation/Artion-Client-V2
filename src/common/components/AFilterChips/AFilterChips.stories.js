import AFilterChips from '@/common/components/AFilterChips/AFilterChips.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';

export default {
    title: 'Components/AFilterChips',
    components: AFilterChips,
};

export const Default = () => ({
    components: { AFilterChips },
    //language=HTML
    template: `
        <div>
            <a-filter-chips />
        </div>
    `,
});

export const Data = () => ({
    components: { AFilterChips },
    //language=HTML
    template: `
        <div>
            <a-filter-chips :data="data" />
        </div>
    `,
    data() {
        return {
            data: [{ label: 'item 1' }, { label: 'item 2' }, { label: 'item 3' }, { label: 'item 4' }],
        };
    },
});

export const Model = () => ({
    components: { AFilterChips, FButton },
    //language=HTML
    template: `
        <div>
            <a-filter-chips v-model="data" />
            <br />
            data: {{ data }} <br />
            <f-button secondary size="small" @click.native="data = [{ label: 'NEW CHIP'}]">Set data</f-button>
        </div>
    `,
    data() {
        return {
            data: [{ label: 'item 1' }, { label: 'item 2' }, { label: 'item 3' }, { label: 'item 4' }],
        };
    },
});
