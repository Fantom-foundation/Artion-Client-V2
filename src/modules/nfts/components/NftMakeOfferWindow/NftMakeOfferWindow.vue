<template>
    <a-window ref="window" :closing-disabled="txStatus === 'pending'" v-bind="$attrs" class="fwindow-width-4">
        <nft-make-offer-form :token="token" @transaction-status="onTransactionStatus" />
    </a-window>
</template>
<script>
import NftMakeOfferForm from '@/modules/nfts/components/NftMakeOfferForm/NftMakeOfferForm';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';

export default {
    name: 'NftMakeOfferWindow',

    components: { AWindow, NftMakeOfferForm },

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

            if (this.txStatus === 'success') {
                this.$emit('tx-success');

                this.$nextTick(() => {
                    this.hide();
                });
            }
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
