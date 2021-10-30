<template>
    <div class="nftsellbutton">
        <a-button :label="$t('nftsellbutton.sell')" :loading="txStatus === 'pending'" @click.native="onButtonClick" />

        <a-tx-window ref="window" :title="$t('nftsellwindow.sellItem')" v-slot="{ onTxStatus }">
            <nft-sell-form
                :token="token"
                @transaction-status="
                    onTxStatus($event);
                    onTransactionStatus($event);
                "
            />
        </a-tx-window>
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import ATxWindow from '@/common/components/ATxWindow/ATxWindow.vue';
import NftSellForm from '@/modules/nfts/components/NftSellForm/NftSellForm.vue';

export default {
    name: 'NftSellButton',

    components: { NftSellForm, ATxWindow, AButton },

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
