import NftCard from '@/modules/nfts/components/NftCard/NftCard.vue';

export default {
    title: 'Components/NftCard',
    components: NftCard,
};

export const Default = () => ({
    components: { NftCard },
    //language=HTML
    template: `
        <div style="max-width: 365px">
            <nft-card :nftData="item"/>
        </div>
    `,
    data() {
        return {
            item: {
                id: 1,
                likes: 4,
                liked: false,
                nftImage: 'nftcard1.jpg',
                nftName: 'Digital Cobalt Blue (AF)',
                crypto: 0.05,
                cryptoName: 'Fantom',
                cryptoLogo: 'fantom.svg',
                timeLeft: '22 hours',
                lastPrice: {
                    crypto: 0.05,
                    cryptoName: 'Fantom',
                    cryptoLogo: 'fantom.svg',
                },
            },
        };
    },
});
