import WalletListbox from '@/modules/wallet/components/WalletListbox/WalletListbox.vue';

export default {
    title: 'Components/WalletListbox',
    components: WalletListbox,
};

export const Default = () => ({
    components: { WalletListbox },
    //language=HTML
    template: `
        <div style="max-width: 500px">
            <wallet-listbox :wallets="wallets" />
        </div>
    `,
    data() {
        return {
            wallets: [
                {
                    icon: 'metamask',
                    id: 'metamask',
                    label: 'Metamask',
                },
                {
                    icon: 'coinbase',
                    id: 'coinbase',
                    label: 'Coinbase Wallet',
                },
            ],
        };
    },
});

export const WalletPickEvent = () => ({
    components: { WalletListbox },
    //language=HTML
    template: `
        <div style="max-width: 500px">
            <wallet-listbox :wallets="wallets" @wallet-pick="onWalletPick" />
            <br />
            <code>@wallet-pick</code>: {{ wallet }}
        </div>
    `,
    data() {
        return {
            wallets: [
                {
                    icon: 'metamask',
                    id: 'metamask',
                    label: 'Metamask',
                },
                {
                    icon: 'coinbase',
                    id: 'coinbase',
                    label: 'Coinbase Wallet',
                },
            ],
            wallet: {},
        };
    },
    methods: {
        onWalletPick(wallet) {
            this.wallet = wallet;
        },
    },
});
