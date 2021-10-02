import NftCreateForm from '@/modules/nfts/components/NftCreateForm/NftCreateForm.vue';

export default {
    title: 'Components/NftCreateForm',
    components: NftCreateForm,
};

export const Default = () => ({
    components: { NftCreateForm },
    //language=HTML
    template: `
        <div>
            <nft-create-form />
        </div>
    `,
});
