<template>
    <div class="asigntransaction" :hidden="hidden || null" aria-hidden="true">
        <wallet-picker ref="walletPicker" />
    </div>
</template>

<script>
import WalletPicker from '@/modules/wallet/components/WalletPicker/WalletPicker.vue';

export default {
    name: 'ASignTransaction',

    components: { WalletPicker },

    props: {
        tx: {
            type: Object,
            default() {
                return {};
            },
        },
        hidden: {
            type: Boolean,
            default: false,
        },
    },

    watch: {
        tx: {
            handler(value) {
                this.signTransaction(value);
            },
            immediate: true,
        },
    },

    methods: {
        async signTransaction(tx) {
            const { $wallet } = this;

            if (!tx || !tx.to) {
                return;
            }

            if (!$wallet.connected) {
                this.$refs.walletPicker.show();
            } else {
                try {
                    if (!tx.from) {
                        tx.from = $wallet.account;
                    }

                    console.log(JSON.stringify(tx));

                    tx.chainId = $wallet.chainId;
                    tx.nonce = await this.$wallet.getNonce($wallet.account);
                    // tx.from = $wallet.account;
                    tx.gasLimit = await this.$wallet.estimateGas(tx);
                } catch (error) {
                    this.$notifications.add({
                        type: 'error',
                        text: error.message,
                    });
                    console.error(error);
                }

                console.log('tx: ', tx);
            }
        },
    },
};
</script>
