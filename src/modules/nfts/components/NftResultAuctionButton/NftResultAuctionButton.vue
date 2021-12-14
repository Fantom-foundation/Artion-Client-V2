<template>
    <div class="nftresultauctionbutton">
        <a-button
            :label="
                inEscrowAuctionIsFailed || userIsAuctionWinner
                    ? $t('nftresultauction.resultAuction')
                    : $t('nftresultauction.acceptBid')
            "
            :loading="txStatus === 'pending'"
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
    name: 'NftResultAuctionButton',

    components: { ASignTransaction, AButton },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        /** @type {Auction} */
        auction: {
            type: Object,
            default() {
                return {};
            },
        },
        inEscrowAuctionIsFailed: {
            type: Boolean,
            default: false,
        },
        userIsAuctionWinner: {
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
        resultAuction() {
            const web3 = new Web3();
            const { token } = this;

            if (!token || !token.contract) {
                return;
            }

            if (this.inEscrowAuctionIsFailed) {
                this.tx = contracts.resultFailedAuction(token.contract, token.tokenId, web3, this.auction.auctionHall);
            } else {
                this.tx = contracts.resultAuction(token.contract, token.tokenId, web3, this.auction.auctionHall);
            }
        },

        onButtonClick() {
            this.resultAuction();
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    text: this.$t('nftresultauction.acceptBidSuccessful'),
                    type: 'success',
                });

                this.$emit('tx-success');
            }
        },
    },
};
</script>
