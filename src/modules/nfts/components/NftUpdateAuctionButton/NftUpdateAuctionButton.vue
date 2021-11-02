<template>
    <div class="nftupdateauctionbutton">
        <a-button
            :label="$t('nftupdateauctionbutton.updateAuction')"
            :loading="txStatus === 'pending'"
            @click.native="onButtonClick"
        />

        <a-tx-window
            ref="window"
            :title="$t('nftupdateauctionwindow.title')"
            v-slot="{ onTxStatus }"
            class="fwindow-width-5"
        >
            <nft-auction-form
                update
                :auction="auction"
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
import NftAuctionForm from '@/modules/nfts/components/NftAuctionForm/NftAuctionForm.vue';

export default {
    name: 'NftUpdateAuctionButton',

    components: { NftAuctionForm, ATxWindow, AButton },

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

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success' && payload.transactionsLeft === 0) {
                this.$emit('tx-success');
            }
        },
    },
};
</script>
