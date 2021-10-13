<template>
    <div class="asigntransaction" :hidden="hidden || null" aria-hidden="true"></div>
</template>

<script>
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';

export default {
    name: 'ASignTransaction',

    mixins: [eventBusMixin],

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
                this._eventBus.emit('show-wallet-picker');
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
