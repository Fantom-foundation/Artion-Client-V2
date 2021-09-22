import WalletButton from '@/modules/wallet/components/WalletButton/WalletButton.vue';

export default {
    title: 'Components/WalletButton',
    components: WalletButton,
};

export const Default = () => ({
    components: { WalletButton },
    //language=HTML
    template: `
        <div>
            <wallet-button />
        </div>
    `,
    data() {
        return {};
    },
});

export const Loading = () => ({
    components: { WalletButton },
    //language=HTML
    template: `
        <div>
            <wallet-button loading />
        </div>
    `,
    data() {
        return {};
    },
});

export const Wallet = () => ({
    components: { WalletButton },
    //language=HTML
    template: `
        <div>
            <wallet-button :wallet="wallet" />
        </div>
    `,
    data() {
        return {
            wallet: {
                address: '0xc0ffee254729296a45a3885639AC7E10F9d54979',
                chain: 'Fantom',
                // avatar: 'avatar.png',
                avatar: 'avatar2.jpg',
            },
        };
    },
});
