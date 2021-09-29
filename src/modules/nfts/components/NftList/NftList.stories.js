import NftList from '@/modules/nfts/components/NftList/NftList.vue';

export default {
    title: 'Components/NftList',
    components: NftList,
};

export const Default = () => ({
    components: { NftList },
    //language=HTML
    template: `
        <div>
            <nft-list />
        </div>
    `,
});

export const Density = () => ({
    components: { NftList },
    //language=HTML
    template: `
        <div>
            <nft-list :density="200" />
        </div>
    `,
});
