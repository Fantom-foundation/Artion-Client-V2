<template>
    <a-window
        ref="window"
        v-bind="$attrs"
        :title="`${$t('nftsellwindow.sellItem')}`"
        :closing-disabled="txStatus === 'pending'"
        class="fwindow-width-4"
    >
        <nft-sell-form :token="token" @transaction-status="onTransactionStatus" />
    </a-window>
</template>

<script>
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import NftSellForm from '@/modules/nfts/components/NftSellForm/NftSellForm.vue';

export default {
    name: 'NftSellWindow',

    components: { NftSellForm },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
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
