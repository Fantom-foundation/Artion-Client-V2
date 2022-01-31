<template>
    <div class="flex gap-3 ali-center">
        <div class="nftwithdrawbidbutton">
            <a-button
                :label="$t('nftwithdrawbid.withdrawBid')"
                :loading="txStatus === 'pending'"
                :disabled="withdrawBidButtonDisabled"
                @click.native="onButtonClick"
            />

            <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
        </div>
        <span v-if="withdrawBidButtonDisabled"> ({{ $t('nftauction.canWithdrawIn', { in: withdrawBidTime }) }}) </span>
        <span v-if="canResultFailedAuction"> ({{ $t('nftauction.reserveNotMetCanWithdrawAnytime') }}) </span>
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import dayjs from 'dayjs';
import { datetimeFormatter } from '@/utils/formatters';

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
        /** @type {Auction} */
        auction: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            tx: {},
            txStatus: '',
        };
    },

    computed: {
        withdrawBidButtonDisabled() {
            return dayjs().isBefore(this.auction.withdrawSince);
        },

        // can withdraw an underpriced bid using resultFailedAuction() call
        canResultFailedAuction() {
            return !this.auction.reservePriceExceeded && this.auction.props.hasResultFailed;
        },

        withdrawBidTime() {
            return datetimeFormatter(dayjs(this.auction.withdrawSince).valueOf());
        },
    },

    methods: {
        withdrawBid() {
            const web3 = new Web3();
            const { token } = this;

            if (!token || !token.contract) {
                return;
            }

            if (this.canResultFailedAuction) {
                // when the bid is less then the reserve price, bidder can cancel the finished auction
                this.tx = contracts.resultFailedAuction(token.contract, token.tokenId, web3, this.auction.auctionHall);
            } else {
                // regular bid can be withdraw only 12 hours after end of the auction
                this.tx = contracts.withdrawAuctionBid(token.contract, token.tokenId, web3, this.auction.auctionHall);
            }
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
