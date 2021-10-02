import NftListFilters from '@/modules/nfts/components/NftListFilters/NftListFilters.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';

export default {
    title: 'Components/NftListFilters',
    components: NftListFilters,
};

export const Default = () => ({
    components: { NftListFilters },
    //language=HTML
    template: `
        <div>
            <nft-list-filters />
        </div>
    `,
});

export const Filters = () => ({
    components: { NftListFilters },
    //language=HTML
    template: `
        <div>
            <nft-list-filters :filters="{ group: 'single', sortBy: 'listedAt' }" />
        </div>
    `,
});

export const Model = () => ({
    components: { NftListFilters, FButton },
    //language=HTML
    template: `
        <div class="grid" style="max-width: 1024px">
            <nft-list-filters v-model="filters" class="col-6" />
            <div class="col-6 tes-4">
                <pre>
{{ filters }}
                </pre>
                <f-button secondary size="small" @click.native="filters = { group: 'single', sortBy: 'listedAt' }">Set filters</f-button>
            </div>
        </div>
    `,
    data() {
        return {
            filters: { group: 'single', sortBy: 'listedAt' },
        };
    },
});
