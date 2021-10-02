import NftFilters from '@/modules/nfts/components/NftFilters/NftFilters.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';

export default {
    title: 'Components/NftFilters',
    components: NftFilters,
};

export const Default = () => ({
    components: { NftFilters },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <nft-filters />
        </div>
    `,
});

export const Filters = () => ({
    components: { NftFilters },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <nft-filters :filters="{ category: 1, collections: ['rarity-crafting'], status: ['has_bids'] }" />
        </div>
    `,
});

export const Model = () => ({
    components: { NftFilters, FButton },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 750px">
            <nft-filters v-model="filters" class="col-6" />
            <div class="col-6 tes-4">
                <pre>
{{ filters }}
                </pre>
                <f-button secondary size="small" @click.native="filters = { category: 1 }">Set filters</f-button>
            </div>
        </div>
    `,
    data() {
        return {
            filters: { category: 1, collections: ['rarity-crafting'], status: ['has_bids'] },
        };
    },
});
