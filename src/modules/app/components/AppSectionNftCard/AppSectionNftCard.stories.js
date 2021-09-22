import AppSectionNftCard from '@/modules/app/components/AppSectionNftCard/AppSectionNftCard.vue';

export default {
    title: 'Components/AppSectionNftCard',
    components: AppSectionNftCard,
};

export const Default = () => ({
    components: { AppSectionNftCard },
    //language=HTML
    template: `
        <div style="max-width: 496px">
            <app-section-nft-card />
        </div>
    `,
});

export const WithNft = () => ({
    components: { AppSectionNftCard },
    //language=HTML
    template: `
        <div style="max-width: 496px">
            <app-section-nft-card :nft="{ title: 'World of Umans', collection: 'Ancestral Uman', img: 'umans.png' }" />
        </div>
    `,
});
