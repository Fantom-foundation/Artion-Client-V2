import NftListingsGrid from '@/modules/nfts/components/NftListingsGrid/NftListingsGrid.vue';

export default {
    title: 'Components/NftListingsGrid',
    components: NftListingsGrid,
};

export const Default = () => ({
    components: { NftListingsGrid },
    //language=HTML
    template: `
        <div style="max-width: 450px; padding: 15px">
            <nft-listings-grid :listing="items" />
        </div>
    `,

    data() {
        return {
            items: [
                {
                    from: '0x0d0c',
                    img: '/img/tmp/owner-avatar.png',
                    link: 'someLink',
                    price: 5000,
                    imgCurrency: '/img/tmp/ftm.png',
                },
                {
                    from: 'ccccc',
                    img: '/img/tmp/owner-avatar.png',
                    link: 'someLink',
                    price: 5000,
                    imgCurrency: '/img/tmp/ftm.png',
                },
            ],
        };
    },
});
