<template>
    <div class="asigntransaction" :hidden="hidden || null" aria-hidden="true"></div>
</template>

<script>
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { toBigNumber, toHex } from '@/utils/big-number.js';

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

    data() {
        return {
            status: '',
        };
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
                    this.setStatus('pending');

                    if (!tx.from) {
                        tx.from = $wallet.account;
                    }

                    tx.chainId = $wallet.chainId;
                    tx.nonce = await this.$wallet.getNonce($wallet.account, true);
                    // tx.from = $wallet.account;
                    tx.gasLimit = await this.$wallet.estimateGas(tx);
                    tx.gasPrice = await this.$wallet.getGasPrice(true);

                    tx.gasLimit = toHex(toBigNumber(tx.gasLimit).plus(2000));

                    if (!tx.from) {
                        tx.from = this.$wallet.account;
                    }

                    console.log('TX: ', tx);

                    const txHash = await this.$wallet.signTransaction(tx, true);

                    console.log('DONE!!!!');

                    this.setStatus('success', txHash);
                } catch (error) {
                    this.setStatus('error', error);
                    console.error(error);
                }
            }
        },

        setStatus(status, data) {
            this.status = status;

            if (status === 'error') {
                this.$notifications.add({
                    type: 'error',
                    text: data.message,
                });
            }

            this.$emit('transaction-status', { status, data });
        },
    },
};
</script>
