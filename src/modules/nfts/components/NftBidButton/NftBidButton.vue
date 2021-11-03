<template>
    <div class="nftbidbutton">
        <a-button :label="$t('nftbid.placeBid')" :loading="txStatus === 'pending'" @click.native="onButtonClick" />

        <a-tx-window ref="window" :title="$t('nftbid.placeBid')" v-slot="{ onTxStatus }">
            <nft-bid-form
                :token="token"
                :auction="auction"
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
import NftBidForm from '@/modules/nfts/components/NftBidForm/NftBidForm.vue';

export default {
    name: 'NftBidButton',

    components: { NftBidForm, ATxWindow, AButton },

    props: {
        /** @type {Auction} */
        auction: {
            type: Object,
            default() {
                return {};
            },
        },
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

        /**
         * @param {TransactionStatus} payload
         */
        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success' && payload.code === 'place_bid') {
                this.$emit('tx-success');
            }
        },
    },
};
</script>
