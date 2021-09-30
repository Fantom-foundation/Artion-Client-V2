import CategoriesFilter from '@/modules/nfts/components/CategoriesFilter/CategoriesFilter.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';

export default {
    title: 'Components/CategoriesFilter',
    components: CategoriesFilter,
};

export const Default = () => ({
    components: { CategoriesFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <categories-filter />
        </div>
    `,
    data() {
        return {};
    },
});

export const Selected = () => ({
    components: { CategoriesFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <categories-filter :selected="1" />
        </div>
    `,
    data() {
        return {};
    },
});

export const ChangeEvent = () => ({
    components: { CategoriesFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <categories-filter @change="selected = $event" />
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
    components: { CategoriesFilter, FButton },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <categories-filter v-model="selected" />
            <br />
            selected: {{ selected }} <br />
            <f-button secondary size="small" @click.native="selected = 1">Set value to 1</f-button>
        </div>
    `,
    data() {
        return {
            selected: 2,
        };
    },
});
