<template>
    <div class="nftwithdrawbidbutton">
        <a-button
            :label="$t('nftwithdrawbid.withdrawBid')"
            :loading="txStatus === 'pending'"
            :disabled="disabled"
            @click.native="onButtonClick"
        />

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';

export default {
    name: 'NftWithdrawBidButton',

    components: { ASignTransaction, AButton },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            tx: {},
            txStatus: '',
        };
    },

    methods: {
        withdrawBid() {
            const web3 = new Web3();
            const { token } = this;

            if (!token || !token.contract) {
                return;
            }

            this.tx = contracts.withdrawAuctionBid(token.contract, token.tokenId, web3);
        },

        onButtonClick() {
            this.withdrawBid();
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    text: this.$t('nftwithdrawbid.withdrawBidSuccessful'),
                    type: 'success',
                });

                this.$emit('tx-success');
            }
        },
    },
};
</script>
