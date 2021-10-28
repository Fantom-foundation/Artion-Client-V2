<template>
    <div class="nftsellbutton">
        <a-button :label="$t('nftsellbutton.sell')" :loading="txStatus === 'pending'" @click.native="onButtonClick" />

        <nft-sell-window ref="window" :token="token" @transaction-status="onTransactionStatus" />
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import NftSellWindow from '@/modules/nfts/components/NftSellWindow/NftSellWindow.vue';

export default {
    name: 'NftSellButton',

    components: { NftSellWindow, AButton },

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
        onButtonClick() {
            this.$refs.window.show();
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$emit('tx-success');
            }
        },
    },
};
</script>
