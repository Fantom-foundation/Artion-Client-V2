import WalletPickerWindow from '@/modules/wallet/components/WalletPickerWindow/WalletPickerWindow.vue';

export default {
    title: 'Components/WalletPickerWindow',
    components: WalletPickerWindow,
};

export const Default = () => ({
    components: { WalletPickerWindow },
    //language=HTML
    template: `
        <div>
            <wallet-picker-window :wallets="wallets" ref="window" />

            <f-button @click.native="$refs.window.show()">show</f-button>
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

export const Title = () => ({
    components: { WalletPickerWindow },
    //language=HTML
    template: `
        <div>
            <wallet-picker-window title="Connect to a wallet" :wallets="wallets" ref="window" />

            <f-button @click.native="$refs.window.show()">show</f-button>
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
    components: { WalletPickerWindow },
    //language=HTML
    template: `
        <div>
            <wallet-picker-window :wallets="wallets" @wallet-pick="onWalletPick" ref="window" />
            <f-button @click.native="$refs.window.show()">show</f-button>
            <br /><br />
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
