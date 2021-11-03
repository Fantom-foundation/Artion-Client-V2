<template>
    <div class="nftauction">
        <a-details open>
            <template #label>
                <div class="nftdetail_details_wrap">
                    <template v-if="auctionHasStarted">
                        {{ $t('nftauction.saleEnds') }} {{ auctionEndsIn }} ({{ auctionEndTime }})
                    </template>
                    <template v-else>
                        {{ $t('nftauction.saleStarts') }} {{ auctionStartsIn }} ({{ auctionStartTime }})
                    </template>
                </div>
            </template>
            <template>
                <div class="grid">
                    <div class="flex gap-3">
                        <span>{{ $t('nftauction.reservePrice') }}:</span>
                        <a-token-value :value="auction.reservePrice" :token="payToken" no-symbol />
                    </div>
                    <template v-if="auctionHasStarted">
                        <div class="flex gap-3">
                            <span>{{ $t('nftauction.highestBid') }}:</span>
                            <a-token-value
                                v-if="auction.lastBid"
                                :value="auction.lastBid"
                                :token="payToken"
                                no-symbol
                            />
                            <span v-else>-</span>
                        </div>
                        <div v-if="!isOwner">
                            <nft-bid-button :token="token" :auction="auction" @tx-success="onBidTxSuccess" />
                        </div>
                    </template>
                </div>
            </template>
        </a-details>
    </div>
</template>

<script>
import ADetails from '@/common/components/ADetails/ADetails.vue';
import dayjs from 'dayjs';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import { datetimeFormatter } from '@/utils/formatters.js';
import { getPayToken } from '@/utils/pay-tokens.js';
import { mapState } from 'vuex';
import { compareAddresses } from '@/utils/address.js';
import NftBidButton from '@/modules/nfts/components/NftBidButton/NftBidButton.vue';

export default {
    name: 'NftAuction',

    components: { NftBidButton, ATokenValue, ADetails },

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

        isOwner() {
            const { owner } = this.auction;

            return owner ? compareAddresses(owner, this.walletAddress) : false;
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

        onBidTxSuccess() {
            this.$emit('tx-success');
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
