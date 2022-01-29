<template>
    <div class="nftauction">
        <a-details open disabled>
            <template #label>
                <div class="nftauction_label grid">
                    <template v-if="auctionHasStarted">
                        <template v-if="auctionHasFinished">
                            <div>{{ $t('nftauction.saleEnded') }}</div>
                        </template>
                        <template v-else>
                            <div>
                                {{ $t('nftauction.saleEnds') }}
                                <template v-if="!showEndCountdown">{{ auctionEndsIn }} ({{ auctionEndTime }})</template>
                                <template v-else>{{ auctionEndTime }}</template>
                            </div>
                            <f-countdown
                                v-if="showEndCountdown && dAuction.endTime"
                                :date="dAuction.endTime"
                                :css-classes="countdownCssClasses"
                                with-labels
                                use-two-digit-numbers
                                :show="getCountdownShow(dAuction.endTime)"
                                @time-up="onAuctionEndTimeUp"
                            />
                        </template>
                    </template>
                    <template v-else>
                        <div>
                            {{ $t('nftauction.saleStarts') }}
                            <span v-if="!showStartCountdown">{{ auctionStartsIn }} ({{ auctionStartTime }})</span>
                            <template v-else>{{ auctionStartTime }}</template>
                        </div>
                        <f-countdown
                            v-if="showStartCountdown && dAuction.startTime"
                            :date="dAuction.startTime"
                            with-labels
                            use-two-digit-numbers
                            :show="getCountdownShow(dAuction.startTime)"
                            @time-up="onAuctionStartTimeUp"
                        />
                    </template>
                </div>
            </template>

            <div class="grid">
                <div class="flex gap-3 ali-center">
                    <span>{{ $t('nftauction.reservePrice') }}:</span>
                    <a-token-value :value="dAuction.reservePrice" :token="payToken" no-symbol :fraction-digits="1" />
                </div>
                <template v-if="auctionHasStarted">
                    <div class="flex gap-3 ali-center">
                        <span>{{ $t('nftauction.highestBid') }}:</span>
                        <a-token-value
                            v-if="dAuction.lastBid"
                            :value="dAuction.lastBid"
                            :token="payToken"
                            no-symbol
                            :fraction-digits="1"
                        />
                        <span v-else>-</span>
                    </div>
                    <nft-result-auction-button
                        v-if="canResultAuction"
                        :token="token"
                        :auction="auction"
                        :user-is-last-bidder="userIsLastBidder"
                        @tx-success="onTxSuccess"
                    />
                    <nft-bid-button
                        v-if="!userOwnsToken && !auctionHasFinished"
                        :token="token"
                        :auction="auction"
                        @tx-success="onTxSuccess"
                    />
                    <nft-withdraw-bid-button
                        v-if="showWithdrawBidButton"
                        :token="token"
                        :auction="auction"
                        @tx-success="onTxSuccess"
                    />
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
import FCountdown from 'fantom-vue-components/src/components/FCountdown/FCountdown.vue';
import { pollingMixin } from '@/common/mixins/polling.js';
import { getAuction } from '@/modules/nfts/queries/auction.js';
import { compareAddresses } from '@/utils/address.js';
import { toBigNumber } from '@/utils/big-number.js';

const UPDATE_AUCTION = 'update-auction';

export default {
    name: 'NftAuction',

    components: { NftWithdrawBidButton, NftResultAuctionButton, NftBidButton, ATokenValue, ADetails, FCountdown },

    mixins: [pollingMixin],

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
            dAuction: {},
            countdownCssClasses: [
                {
                    // an hour
                    time: 60 * 60 * 1000,
                    cssClass: 'nftauction_countdown-red',
                },
            ],
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        auctionHasStarted() {
            return dayjs(this.dAuction.startTime).diff(dayjs()) <= 0;
        },

        auctionStartTime() {
            return datetimeFormatter(this.dAuction.startTime);
        },

        auctionStartsIn() {
            return dayjs(this.dAuction.startTime).fromNow();
        },

        auctionEndTime() {
            return datetimeFormatter(this.dAuction.endTime);
        },

        auctionEndsIn() {
            return dayjs(this.dAuction.endTime).fromNow();
        },

        auctionHasFinished() {
            return isExpired(this.dAuction.endTime);
        },

        canResultAuction() {
            return (
                // seller can result an auction which has finished and has some winner + for now it also need to be above the reservePrice
                (this.userOwnsToken &&
                    this.auctionHasFinished &&
                    this.dAuction.lastBidder &&
                    !this.lastBidIsBelowReservePrice) ||
                // winner can result an auction which has finished above the reservePrice
                (this.userIsLastBidder && this.auctionHasFinished && !this.lastBidIsBelowReservePrice)
            );
        },

        showWithdrawBidButton() {
            return this.auctionHasFinished && this.userIsLastBidder;
        },

        userIsLastBidder() {
            return compareAddresses(this.dAuction.lastBidder, this.walletAddress);
        },

        showStartCountdown() {
            return !this.auctionHasStarted && dayjs(this.dAuction.startTime).diff(dayjs(), 'days') < 3;
        },

        showEndCountdown() {
            return this.auctionHasStarted && dayjs(this.dAuction.endTime).diff(dayjs(), 'days') < 3;
        },

        lastBidIsBelowReservePrice() {
            const { lastBid } = this.auction;

            if (lastBid) {
                return toBigNumber(lastBid).isLessThan(this.dAuction.reservePrice);
            }

            return true;
        },
    },

    watch: {
        auction: {
            handler(value) {
                if (value.contract) {
                    this.dAuction = value;
                    this.setPayToken(value);

                    if (this.auctionHasStarted) {
                        this.startUpdateAuctionPolling();
                    }
                }
            },
            immediate: true,
        },
    },

    methods: {
        async setPayToken(auction = this.dAuction) {
            this.payToken = (await getPayToken(auction.payToken)) || {};
        },

        async updateAuction() {
            const auction = (await getAuction(this.token.contract, this.token.tokenId)) || {};

            if (isExpired(auction.closed)) {
                this.dAuction = auction;

                this.stopUpdateAuctionPolling();
                this.$emit('tx-success');
            } else {
                this.dAuction.lastBid = auction.lastBid;
            }
        },

        startUpdateAuctionPolling() {
            if (this._polling) {
                this._polling.start(
                    UPDATE_AUCTION,
                    () => {
                        this.updateAuction();
                    },
                    3000
                );
            }
        },

        stopUpdateAuctionPolling() {
            if (this._polling) {
                this._polling.stop(UPDATE_AUCTION);
            }
        },

        getCountdownShow(date) {
            return dayjs(date).diff(dayjs(), 'days') < 1 ? 'hms' : 'dhms';
        },

        onTxSuccess() {
            this.$emit('tx-success');
        },

        onAuctionStartTimeUp() {
            this.$emit('auction-time-up');
        },

        onAuctionEndTimeUp() {
            this.$emit('auction-time-up');
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
