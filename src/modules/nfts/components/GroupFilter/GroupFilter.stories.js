import GroupFilter from '@/modules/nfts/components/GroupFilter/GroupFilter.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';
import { GROUP_FILTERS } from '@/common/constants/group-filter.js';

export default {
    title: 'Components/GroupFilter',
    components: GroupFilter,
};

export const Default = () => ({
    components: { GroupFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <group-filter />
        </div>
    `,
    data() {
        return {};
    },
});

export const Selected = () => ({
    components: { GroupFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <group-filter :selected="GROUP_FILTERS[1].value" />
        </div>
    `,
    data() {
        return {
            GROUP_FILTERS: GROUP_FILTERS(),
        };
    },
});

export const ChangeEvent = () => ({
    components: { GroupFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <group-filter @change="selected = $event" />
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
    components: { GroupFilter, FButton },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <group-filter v-model="selected" />
            <br />
            selected: {{ selected }} <br />
            <f-button secondary size="small" @click.native="selected = GROUP_FILTERS[0].value">Set value to '{{ GROUP_FILTERS[0].value }}'</f-button>
        </div>
    `,
    data() {
        return {
            selected: 2,
            GROUP_FILTERS: GROUP_FILTERS(),
        };
    },
});
