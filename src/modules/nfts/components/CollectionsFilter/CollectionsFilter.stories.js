import CollectionsFilter from '@/modules/nfts/components/CollectionsFilter/CollectionsFilter.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';
import { collectionsData } from '@/common/constants/dummy/collections-data.js';

export default {
    title: 'Components/CollectionsFilter',
    components: CollectionsFilter,
};

export const Default = () => ({
    components: { CollectionsFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <collections-filter :collections="collections" />
        </div>
    `,
    data() {
        return {
            collections: collectionsData(),
        };
    },
});

export const Selected = () => ({
    components: { CollectionsFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <collections-filter :selected="['rarity-crafting']" :collections="collections" />
        </div>
    `,
    data() {
        return {
            collections: collectionsData(),
        };
    },
});

export const ChangeEvent = () => ({
    components: { CollectionsFilter },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <collections-filter @change="selected = $event" :selected="selected" :collections="collections" />
            <br />
            selected: {{ selected }}
        </div>
    `,
    data() {
        return {
            collections: collectionsData(),
            selected: ['rarity-crafting'],
        };
    },
});

export const Model = () => ({
    components: { CollectionsFilter, FButton },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <collections-filter v-model="selected" :collections="collections" />
            <br />
            selected: {{ selected }} <br />
            <f-button secondary size="small" @click.native="selected = ['mowse-pack']">Set value</f-button>
        </div>
    `,
    data() {
        return {
            collections: collectionsData(),
            selected: ['rarity-crafting', 'pumpkittens'],
        };
    },
});
