<template>
    <div class="nftsellbutton">
        <a-button :label="$t('nftsellbutton.sell')" :loading="txStatus === 'pending'" @click.native="onButtonClick" />

        <a-tx-window
            ref="window"
            :token="token"
            :title="$t('nftsellwindow.sellItem')"
            component="nft-sell-form"
            @transaction-status="onTransactionStatus"
        />
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import ATxWindow from '@/common/components/ATxWindow/ATxWindow.vue';

export default {
    name: 'NftSellButton',

    components: { ATxWindow, AButton },

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
