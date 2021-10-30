<template>
    <a-window ref="window" :title="title" :closing-disabled="txStatus === 'pending'" class="fwindow-width-4">
        <component :is="component" v-bind="$attrs" @transaction-status="onTransactionStatus" />
    </a-window>
</template>

<script>
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import NftSellForm from '@/modules/nfts/components/NftSellForm/NftSellForm.vue';

/**
 * Modal window that contains a component with transaction process
 */
export default {
    name: 'ATxWindow',

    components: { NftSellForm },

    props: {
        /** Window title */
        title: {
            type: String,
            default: '',
        },
        /** Child component */
        component: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            txStatus: '',
        };
    },

    methods: {
        ...copyMethods(AWindow, ['show', 'hide', 'toggle'], 'window'),

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            this.$emit('transaction-status', payload);

            if (this.txStatus === 'success') {
                this.$nextTick(() => {
                    this.hide();
                });
            }
        },
    },
};
</script>
