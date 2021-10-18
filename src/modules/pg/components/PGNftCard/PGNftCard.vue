<template>
    <div class="pg-nft-card">
        <div class="pg-nft-card__img-cont">
            <a-video :poster="token.poster" :src="token.videoSrc" loop autoplay></a-video>
            <!--            <img src="img/tmp/pg.jpeg" alt="" class="pg-nft-card__img-el" />-->
        </div>
        <div class="pg-nft-card__cta">
            <div class="pg-nft-card__cta-top">
                <div class="pg-nft-card__bid">
                    <template v-if="!token.hasAuction">
                        <h6 class="h6">{{ $t('pgNftCard.price') }}</h6>

                        <h4 class="h4">300 FTM</h4>
                        <p class="pg-nft-card__note">$400</p>
                    </template>

                    <template v-else>
                        <h6 class="h6">{{ $t('pgNftCard.currentBid') }}</h6>

                        <template v-if="auction.lastBid">
                            <h4 class="h4">{{ currentBid }} WFTM</h4>
                            <p class="pg-nft-card__note">{{ currentBid$ }}</p>
                            <!--                        <p class="pg-nft-card__note">$28,671.45</p>-->
                        </template>

                        <h4 v-else class="h4">{{ $t('pgNftCard.noBids') }}</h4>
                    </template>
                </div>
                <div class="pg-nft-card__v-separator"></div>
                <div class="pg-nft-card__countdown">
                    <template v-if="!token.hasAuction">
                        <h6 class="h6 theme-pg-u-text-right">{{ $t('pgNftCard.minted') }}</h6>
                        <h4 class="h4 theme-pg-u-text-right">0 / 350</h4>
                    </template>

                    <template v-else>
                        <h6 class="h6">{{ auctionOn ? $t('pgNftCard.endsIn') : $t('pgNftCard.startsIn') }}</h6>
                        <div v-if="countdown" class="pg-nft-card__countdown-time">
                            <div>
                                <h4 class="h4 pg-nft-card__countdown-number">{{ days }}</h4>
                                <div class="pg-nft-card__note">{{ $t('pgNftCard.days') }}</div>
                            </div>
                            <div>
                                <h4 class="h4 pg-nft-card__countdown-number">{{ hours }}</h4>
                                <div class="pg-nft-card__note">{{ $t('pgNftCard.hours') }}</div>
                            </div>
                            <div>
                                <h4 class="h4 pg-nft-card__countdown-number">{{ minutes }}</h4>
                                <div class="pg-nft-card__note">{{ $t('pgNftCard.minutes') }}</div>
                            </div>
                            <div>
                                <h4 class="h4 pg-nft-card__countdown-number">{{ seconds }}</h4>
                                <div class="pg-nft-card__note">{{ $t('pgNftCard.seconds') }}</div>
                            </div>
                        </div>

                        <h4 v-else class="h4">{{ $t('pgNftCard.hasEnded') }}</h4>
                    </template>
                </div>
            </div>

            <div class="pg-nft-card__address" :class="{ 'pg-nft-card__address--empty': !lastBidder }">
                <f-ellipsis :text="lastBidder" overflow="middle" :fixed-chars-count="4" style="max-width: 120px;" />
            </div>

            <div class="pg-nft-card__cta-bottom">
                <template v-if="false">
                    <wallet-button-wrap :wallet-menu="walletMenu" />
                </template>
                <span v-else-if="token.hasAuction" class="pg-nft-card__button">
                    <f-button
                        @click.native="$refs.modal.show()"
                        size="large"
                        :label="auctionOn ? 'Place a bid' : 'Starting soon'"
                        :disabled="!auctionOn"
                    />
                </span>
                <span v-else-if="!token.hasAuction" class="pg-nft-card__button">
                    <f-button
                        @click.native="$refs.modal.show()"
                        size="large"
                        :label="auctionOn ? 'Buy now' : 'Starting soon'"
                        :disabled="!auctionOn"
                    />
                </span>
            </div>
        </div>

        <f-window ref="modal" :title="$t('pgModal.heading')" style="max-width: 640px; min-width: 30vw;">
            <p-g-bid-form></p-g-bid-form>
        </f-window>
    </div>
</template>

<script>
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow.vue';
import WalletButtonWrap from '@/modules/wallet/components/WalletButtonWrap/WalletButtonWrap.vue';
import PGBidForm from '../PGBidForm/PGBidForm';
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import dayjs from 'dayjs';
import { toBigNumber } from '@/utils/big-number.js';
import { formatTokenValue } from '@/utils/formatters.js';
import AVideo from '@/common/components/AVideo/AVideo.vue';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default {
    name: 'PGNftCard',

    components: {
        AVideo,
        FWindow,
        WalletButtonWrap,
        PGBidForm,
        FEllipsis,
    },

    props: {
        /** NFT object */
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        /** Auction object */
        auction: {
            type: Object,
            default() {
                return {};
            },
        },
        /** WFTM */
        payToken: {
            type: Object,
            default() {
                return {};
            },
        },
        /** Specifies if auction is on or off */
        auctionOn: {
            type: Boolean,
            default: false,
        },
        /** Specifies auction start date */
        auctionStart: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            countdown: null,
            endDate: '',
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            walletMenu: [
                {
                    label: this.$t('walletMenu.settings'),
                    route: 'pg-account-settings',
                },
                {
                    label: this.$t('walletMenu.logout'),
                    action: 'logout',
                },
            ],
        };
    },

    computed: {
        currentBid() {
            const { lastBid } = this.auction;

            return lastBid ? formatTokenValue(lastBid, this.payToken.priceDecimals, 1) : '';
        },

        currentBid$() {
            const { lastBid } = this.auction;
            const bLastBid$ = lastBid ? toBigNumber(lastBid).multipliedBy(this.payToken.price) : null;

            return bLastBid$ ? formatTokenValue(bLastBid$, this.payToken.priceDecimals, 2, true) : '';
        },

        lastBidder() {
            return this.auction.lastBidder || '';
        },
    },

    watch: {
        auction(value) {
            if (this.auctionOn) {
                // TMP!
                // value.lastBid = toHex(bToWei(15500));
                // END TMP!

                this.startCountdown(dayjs(value.endTime).valueOf());
            }
        },
    },

    created() {
        this.init();
    },

    methods: {
        init() {
            if (!this.auctionOn) {
                this.startCountdown(this.auctionStart);
            }
        },

        startCountdown(endDateTs) {
            console.log('end', endDateTs);

            this.countdown = setInterval(() => {
                const difference = endDateTs - Date.now();
                if (difference < 0) {
                    clearInterval(this.countdown);
                    this.countdown = null;
                    return;
                }

                this.days = Math.floor(difference / DAY);
                this.hours = Math.floor((difference % DAY) / HOUR);
                this.minutes = Math.floor((difference % HOUR) / MINUTE);
                this.seconds = Math.floor((difference % MINUTE) / SECOND);
            }, 1000);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
