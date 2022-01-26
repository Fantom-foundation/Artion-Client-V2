<template>
    <div class="nfttransferbutton">
        <f-button
            secondary
            @click.native="onButtonClick"
            :data-tooltip="$t('nfttransfer.transfer')"
            :aria-label="$t('nfttransfer.transfer')"
        >
            <app-iconset icon="bear" />
        </f-button>

        <a-tx-window ref="window" :title="$t('nfttransfer.transfer')" v-slot="{ onTxStatus }">
            <nft-transfer-form
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
import ATxWindow from '@/common/components/ATxWindow/ATxWindow';
import NftTransferForm from '@/modules/nfts/components/NftTransferForm/NftTransferForm';

export default {
    name: 'NftTransferButton',

    components: {
        ATxWindow,
        NftTransferForm,
    },

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
            console.log('transaction status', payload);
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$emit('tx-success');
            }
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
