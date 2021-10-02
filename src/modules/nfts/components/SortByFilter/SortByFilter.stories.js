import SortByFilter from '@/modules/nfts/components/SortByFilter/SortByFilter.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';
import { SORT_BY_FILTERS } from '@/common/constants/sort-by-filters.js';

export default {
    title: 'Components/SortByFilter',
    components: SortByFilter,
};

export const Default = () => ({
    components: { SortByFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <sort-by-filter />
        </div>
    `,
});

export const Selected = () => ({
    components: { SortByFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <sort-by-filter :selected="SORT_BY_FILTERS[1].value" />
        </div>
    `,
    data() {
        return {
            SORT_BY_FILTERS: SORT_BY_FILTERS(),
        };
    },
});

export const ChangeEvent = () => ({
    components: { SortByFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <sort-by-filter @change="selected = $event" />
            <br />
            selected: {{ selected }}
        </div>
    `,
    data() {
        return {
            selected: '',
        };
    },
});

export const Model = () => ({
    components: { SortByFilter, FButton },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <sort-by-filter v-model="selected" />
            <br />
            selected: {{ selected }} <br />
            <f-button secondary size="small" @click.native="selected = SORT_BY_FILTERS[3].value">Set value to '{{ SORT_BY_FILTERS[3].value }}'</f-button>
        </div>
    `,
    data() {
        return {
            selected: 2,
            SORT_BY_FILTERS: SORT_BY_FILTERS(),
        };
    },
});
