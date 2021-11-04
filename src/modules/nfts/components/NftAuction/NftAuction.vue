<template>
    <div class="nftauction">
        <a-details open>
            <template #label>
                <div class="nftdetail_details_wrap">
                    <template v-if="auctionHasStarted">
                        <template v-if="auctionHasFinished">
                            {{ $t('nftauction.saleEnded') }}
                        </template>
                        <template v-else>
                            {{ $t('nftauction.saleEnds') }} {{ auctionEndsIn }} ({{ auctionEndTime }})
                        </template>
                    </template>
                    <template v-else>
                        {{ $t('nftauction.saleStarts') }} {{ auctionStartsIn }} ({{ auctionStartTime }})
                    </template>
                </div>
            </template>

            <div class="grid">
                <div class="flex gap-3 ali-center">
                    <span>{{ $t('nftauction.reservePrice') }}:</span>
                    <a-token-value :value="auction.reservePrice" :token="payToken" no-symbol />
                </div>
                <template v-if="auctionHasStarted">
                    <div class="flex gap-3 ali-center">
                        <span>{{ $t('nftauction.highestBid') }}:</span>
                        <a-token-value v-if="auction.lastBid" :value="auction.lastBid" :token="payToken" no-symbol />
                        <span v-else>-</span>
                    </div>
                    <nft-result-auction-button
                        v-if="userOwnsToken && auctionHasFinished && auction.lastBidder"
                        :token="token"
                        @tx-success="onTxSuccess"
                    />
                    <nft-bid-button
                        v-if="!userOwnsToken && !auctionHasFinished"
                        :token="token"
                        :auction="auction"
                        @tx-success="onTxSuccess"
                    />
                    <div v-if="showWithdrawBidButton" class="flex gap-3 ali-center">
                        <nft-withdraw-bid-button
                            :disabled="withdrawBidButtonDisabled"
                            :token="token"
                            @tx-success="onTxSuccess"
                        />

                        <span v-if="withdrawBidButtonDisabled"
                            >({{ $t('nftauction.canWithdrawIn', { in: withdrawBidTime }) }})</span
                        >
                    </div>
                </template>
            </div>
        </a-details>
    </div>
</template>

<script>
import ADetails from '@/common/components/ADetails/ADetails.vue';
import dayjs from 'dayjs';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import { datetimeFormatter } from '@/utils/formatters.js';
import { getPayToken } from '@/utils/pay-tokens.js';
import NftBidButton from '@/modules/nfts/components/NftBidButton/NftBidButton.vue';
import { isExpired } from '@/utils/date.js';
import NftResultAuctionButton from '@/modules/nfts/components/NftResultAuctionButton/NftResultAuctionButton.vue';
import NftWithdrawBidButton from '@/modules/nfts/components/NftWithdrawBidButton/NftWithdrawBidButton.vue';
import { mapState } from 'vuex';

export default {
    name: 'NftAuction',

    components: { NftWithdrawBidButton, NftResultAuctionButton, NftBidButton, ATokenValue, ADetails },

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
        userOwnsToken: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            payToken: {},
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        auctionHasStarted() {
            return dayjs(this.auction.startTime).diff(dayjs()) <= 0;
        },

        auctionStartTime() {
            return datetimeFormatter(this.auction.startTime);
        },

        auctionStartsIn() {
            return dayjs(this.auction.startTime).fromNow();
        },

        auctionEndTime() {
            return datetimeFormatter(this.auction.endTime);
        },

        auctionEndsIn() {
            return dayjs(this.auction.endTime).fromNow();
        },

        auctionHasFinished() {
            return isExpired(this.auction.endTime);
        },

        showWithdrawBidButton() {
            return this.auctionHasFinished && this.auction.lastBidder === this.walletAddress;
        },

        withdrawBidButtonDisabled() {
            return dayjs().diff(this.auction.endTime, 'hours') < 12;
        },

        withdrawBidTime() {
            return datetimeFormatter(
                dayjs(this.auction.endTime)
                    .add(12, 'hours')
                    .valueOf()
            );
        },
    },

    watch: {
        auction: {
            handler(value) {
                if (value.contract) {
                    this.setPayToken(value);
                }
            },
            immediate: true,
        },
    },

    methods: {
        async setPayToken(auction = this.auction) {
            this.payToken = (await getPayToken(auction.payToken)) || {};
        },

        onTxSuccess() {
            this.$emit('tx-success');
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
