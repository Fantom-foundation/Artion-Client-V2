import NftMakeOfferWindow from '@/modules/nfts/components/NftMakeOfferWindow/NftMakeOfferWindow.vue';

export default {
    title: 'Components/NftMakeOfferWindow',
    components: NftMakeOfferWindow,
};

export const Default = () => ({
    components: { NftMakeOfferWindow },
    //language=HTML
    template: `
        <div>
            <nft-make-offer-window ref="window" />

            <f-button @click.native="$refs.window.show()">show</f-button>
        </div>
    `,
    data() {
        return {};
    },
});
