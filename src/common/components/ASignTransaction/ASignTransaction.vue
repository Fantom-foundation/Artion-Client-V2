<template>
    <div class="asigntransaction" :hidden="hidden || null" aria-hidden="true"></div>
</template>

<script>
export default {
    name: 'ASignTransaction',

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

            if (tx && tx.to && $wallet.connected) {
                try {
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
