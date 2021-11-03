<template>
    <a-window ref="window" :title="title" :closing-disabled="txStatus === 'pending'" class="fwindow-width-4">
        <slot :onTxStatus="onTransactionStatus"></slot>
    </a-window>
</template>

<script>
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import AWindow from '@/common/components/AWindow/AWindow.vue';

/**
 * Modal window that contains a component with transaction process
 */
export default {
    name: 'ATxWindow',

    props: {
        /** Window title */
        title: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            txStatus: '',
        };
    },

    methods: {
        ...copyMethods(AWindow, ['show', 'hide', 'toggle'], 'window'),

        /**
         * @param {TransactionStatus} payload
         */
        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            this.$emit('transaction-status', payload);

            if (this.txStatus === 'success' && (payload.code ? payload.code.indexOf('allowance') === -1 : true)) {
                this.$nextTick(() => {
                    this.hide();
                });
            }
        },
    },
};
</script>
