<template>
    <div class="pg-nft-card" :class="{ 'pg-nft-card--mine': isMine }">
        <div class="pg-nft-card__img-cont" :class="{ 'pg-nft-card__img-cont--limited': !token.hasAuction }">
            <a-video :poster="token.poster" :src="token.videoSrc" loop></a-video>
            <!--            <img src="img/tmp/pg.jpeg" alt="" class="pg-nft-card__img-el" />-->
        </div>
        <div class="pg-nft-card__cta" @click="$refs.cardDetailModal.show()">
            <div class="pg-nft-card__cta-top">
                <div class="pg-nft-card__bid">
                    <template v-if="!token.hasAuction">
                        <h6 class="h6">{{ $t('pgNftCard.price') }}</h6>

                        <h4 class="h4">{{ formatTokenValue(token.price, payToken.decimals) }} wFTM</h4>
                        <p class="pg-nft-card__note">{{ to$(token.price) }}</p>
                    </template>

                    <template v-else-if="!auctionOn">
                        <h6 class="h6">{{ $t('pgNftCard.startingPrice') }}</h6>

                        <h4 class="h4">{{ formatTokenValue(token.startingPrice, payToken.decimals) }} wFTM</h4>
                        <p class="pg-nft-card__note">{{ to$(token.startingPrice, 0) }}</p>
                    </template>

                    <template v-else>
                        <h6 class="h6">{{ $t('pgNftCard.currentBid') }}</h6>

                        <template v-if="auction.lastBid">
                            <h4 class="h4">{{ currentBid }} wFTM</h4>
                            <p class="pg-nft-card__note">{{ currentBid$ }}</p>
                            <!--                        <p class="pg-nft-card__note">$28,671.45</p>-->
                        </template>

                        <h4 v-else class="h4">{{ $t('pgNftCard.noBids') }}</h4>
                    </template>
                </div>

                <template v-if="isMine">
                    <div>
                        <h6 class="h6 " v-html="token.name"></h6>
                        <h4 class="h4">#140</h4>
                    </div>
                </template>

                <div class="pg-nft-card__v-separator"></div>
                <div class="pg-nft-card__countdown">
                    <template v-if="!token.hasAuction">
                        <h6 class="h6 theme-pg-u-text-right">{{ $t('pgNftCard.minted') }}</h6>
                        <h4 class="h4 theme-pg-u-text-right">0 / 350</h4>
                    </template>

                    <template v-else>
                        <h6 class="h6">{{ auctionOn ? $t('pgNftCard.endsIn') : $t('pgNftCard.startsIn') }}</h6>
                        <div v-if="!auctionHasEnded" class="pg-nft-card__countdown-time">
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
                <a :href="`https://ftmscan.com/address/${lastBidder}`" target="_blank">
                    <f-ellipsis :text="lastBidder" overflow="middle" :fixed-chars-count="4" style="max-width: 120px;" />
                </a>
            </div>

            <div class="pg-nft-card__cta-bottom">
                <span class="pg-nft-card__button">
                    <f-button
                        @click.native="onBidButtonClick"
                        size="large"
                        :label="bidButtonLabel"
                        :disabled="!auctionOn || auctionHasEnded || !token.hasAuction"
                    />
                </span>
            </div>
        </div>

        <f-window
            ref="modal"
            :closing-disabled="modalDisabled"
            :title="$t('pgModal.heading')"
            style="max-width: 640px; min-width: 30vw;"
        >
            <p-g-bid-form
                :auction="auction"
                @successful-bid="onSuccessfulBid"
                @transaction-status="onTransactionStatus"
            ></p-g-bid-form>
        </f-window>

        <f-window ref="successModal" style="max-width: 345px">
            <p-g-success-notification></p-g-success-notification>
        </f-window>

        <f-window ref="cardDetailModal" style="max-width: 675px">
            <p-g-nft-card :token="token"></p-g-nft-card>
        </f-window>
    </div>
</template>

<script>
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow.vue';
import PGBidForm from '../PGBidForm/PGBidForm';
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import dayjs from 'dayjs';
import { toBigNumber } from '@/utils/big-number.js';
import { formatNumberByLocale, formatTokenValue, localeOptions } from '@/utils/formatters.js';
import AVideo from '@/common/components/AVideo/AVideo.vue';
import { mapState } from 'vuex';
import { checkWallet } from '@/plugins/wallet/utils.js';
import { auctionIsClosed } from '@/modules/nfts/utils.js';
import PGSuccessNotification from '@/modules/pg/components/PGSuccessNotification/PGSuccessNotification.vue';
import PGNftCard from '@/modules/pg/components/PGNftCard/PGNftCard.vue';
// import { delay } from 'fantom-vue-components/src/utils/function.js';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default {
    name: 'PGNftCard',

    components: {
        PGSuccessNotification,
        AVideo,
        FWindow,
        PGBidForm,
        PGNftCard,
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
            walletConnected: false,
            auctionHasEnded: false,
            modalDisabled: false,
            txStatus: '',
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
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        currentBid() {
            const { lastBid } = this.auction;

            return lastBid ? formatTokenValue(lastBid, this.payToken.decimals, 1) : '';
        },

        currentBid$() {
            return this.to$(this.auction.lastBid);
        },

        lastBidder() {
            return this.auction.lastBidder || '';
        },

        bidButtonLabel() {
            let label = 'Place a bid';

            if (!this.auctionOn || !this.token.hasAuction) {
                label = 'Starting soon';
            } else if (!this.walletConnected) {
                label = 'Connect wallet';
            } else if (!this.token.hasAuction) {
                label = 'Buy now';
            } else if (this.auctionHasEnded) {
                label = this.$t('pgNftCard.hasEnded');
            }

            return label;
        },

        /**
         * Card style modifier
         * @returns {boolean} true if on My NFTs route, false otherwise
         */
        isMine() {
            return this.$route.name === 'pg-account-my-nfts';
        },
    },

    watch: {
        auction(value) {
            if (this.auctionOn && this.token.hasAuction) {
                // TMP!
                // value.lastBid = toHex(bToWei(15500));
                // END TMP!

                // JSON.stringify('AUC', value);

                this.auctionHasEnded = auctionIsClosed(value);

                // this.auctionHasEnded = !!value.closed;
                // console.log('???', this.auctionHasEnded, value.closed, typeof value.closed);
                if (!this.auctionHasEnded) {
                    this.startCountdown(dayjs(value.endTime).valueOf());
                }
            }
        },

        walletAddress: {
            handler(value) {
                this.walletConnected = !!value;
            },
            immediate: true,
        },
    },

    created() {
        this.init();

        this._timeoutId = -1;

        // console.log(toHex(bToWei(4200)));
    },

    beforeDestroy() {
        this.clearTimeout();
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
                    this.auctionHasEnded = true;
                    return;
                }

                this.days = Math.floor(difference / DAY);
                this.hours = Math.floor((difference % DAY) / HOUR);
                this.minutes = Math.floor((difference % HOUR) / MINUTE);
                this.seconds = Math.floor((difference % MINUTE) / SECOND);
            }, 1000);
        },

        to$(value) {
            const value$ = value ? toBigNumber(value).multipliedBy(this.payToken.price) : null;

            return value$ ? formatTokenValue(value$, this.payToken.priceDecimals, 2, true) : '';
        },

        format$(value, decimals = 2) {
            return formatNumberByLocale(value, decimals, localeOptions.currency);
        },

        $toWFTM(value$) {
            return formatNumberByLocale(value$ / this.payToken.price, 0);
        },

        clearTimeout() {
            if (this._timeoutId > -1) {
                clearTimeout(this._timeoutId);
                this._timeoutId = -1;
            }
        },

        startTimeout() {
            this.clearTimeout();
            this._timeoutId = setTimeout(() => {
                this.modalDisabled = false;
            }, 30000);
        },

        async onBidButtonClick() {
            if (!this.walletConnected) {
                this.walletConnected = await checkWallet();
            }

            if (this.walletConnected) {
                this.$refs.modal.show();
            }
        },

        async onSuccessfulBid() {
            console.log('onSuccessfulBid');
            this.$emit('reload-auction');

            this.clearTimeout();

            // await delay(3000);

            this.$refs.successModal.show();
            this.$nextTick(() => {
                this.$refs.modal.hide();
            });
        },

        onTransactionStatus(payload) {
            console.log('onTransactionStatus', payload.status);
            this.txStatus = payload.status;

            this.modalDisabled = this.txStatus === 'pending';

            if (this.txStatus === 'pending' && payload.code === 'bid') {
                this.startTimeout();
            }
        },

        formatTokenValue,
        formatNumberByLocale,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
