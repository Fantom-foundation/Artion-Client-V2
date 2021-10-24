<template>
    <div class="pg-nft-card">
        <div class="pg-nft-card__img-cont" :class="{ 'pg-nft-card__img-cont--limited': !token.hasAuction }">
            <a-video :poster="token.poster" :src="token.videoSrc" loop></a-video>
            <!--            <img src="img/tmp/pg.jpeg" alt="" class="pg-nft-card__img-el" />-->
        </div>
        <div class="pg-nft-card__cta">
            <div class="pg-nft-card__cta-top">
                <div class="pg-nft-card__bid">
                    <template v-if="!token.hasAuction">
                        <h6 class="h6">{{ $t('pgNftCard.price') }}</h6>

                        <p-g-pay-tokens-list :tokens="mPayTokens" />
                        <!--                        <h4 class="h4">{{ formatTokenValue(token.price, payToken.decimals) }} wFTM</h4>
                        <p class="pg-nft-card__note">{{ to$(token.price) }}</p>-->
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

                <div class="pg-nft-card__v-separator"></div>
                <div class="pg-nft-card__countdown">
                    <template v-if="!token.hasAuction">
                        <h6 class="h6 theme-pg-u-text-right">Sold</h6>
                        <!--                        <h4 class="h4 theme-pg-u-text-right">
                            {{ tokensAvailable > -1 ? 350 - tokensAvailable : 0 }} / 350
                        </h4>-->
                        <h4 class="h4 theme-pg-u-text-right">350 / 350</h4>
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
                <span class="pg-nft-card__button" v-if="token.hasAuction">
                    <f-button
                        @click.native="onBidButtonClick"
                        size="large"
                        :label="bidButtonLabel"
                        :disabled="!auctionOn || auctionHasEnded || !token.hasAuction"
                    />
                </span>
                <template v-else-if="!sold">
                    <span v-for="pt in mPayTokens" :key="`pt_${pt.address}`" class="pg-nft-card__button mab-2">
                        <a-button
                            @click.native="onBuyButtonClick(pt)"
                            size="large"
                            :label="getBuyButtonLabel(pt)"
                            :disabled="buyInProgress || sold"
                            :loading="mPayToken.address === pt.address"
                        />
                    </span>
                </template>
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
            <p-g-success-notification />
        </f-window>

        <f-window ref="buySuccessModal" style="max-width: 345px">
            <p-g-success-notification type="mint" />
        </f-window>

        <a-sign-transaction :tx="buyTx" @transaction-status="onBuyTransactionStatus" />
    </div>
</template>

<script>
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow.vue';
import PGBidForm from '../PGBidForm/PGBidForm';
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import dayjs from 'dayjs';
import { bFromTokenValue, toBigNumber, toHex } from '@/utils/big-number.js';
import { formatNumberByLocale, formatTokenValue, localeOptions } from '@/utils/formatters.js';
import AVideo from '@/common/components/AVideo/AVideo.vue';
import { mapState } from 'vuex';
import { checkWallet } from '@/plugins/wallet/utils.js';
import { auctionIsClosed } from '@/modules/nfts/utils.js';
import PGSuccessNotification from '@/modules/pg/components/PGSuccessNotification/PGSuccessNotification.vue';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import { getErc20TokenBalance } from '@/modules/wallet/queries/erc20-token-balance.js';
import { getErc20TokenAllowance } from '@/modules/wallet/queries/erc20-token-allowance.js';
import erc20Utils from '@/utils/erc20-utils.js';
import AButton from '@/common/components/AButton/AButton.vue';
import { pollingMixin } from '@/common/mixins/polling.js';
import PGPayTokensList from '@/modules/pg/components/PGPayTokensList/PGPayTokensList.vue';
import { getRandomTradeTokensAmount } from '@/modules/pg/queries/random-trade.js';
import contracts from '@/utils/artion-contracts-utils.js';
import Web3 from 'web3';

const RANDOM_TRADE_CONTRACT = process.env.VUE_APP_FANTOM_RANDOM_PURCHASE_CONTRACT_ADDRESS;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default {
    name: 'PGNftCard',

    components: {
        PGPayTokensList,
        AButton,
        ASignTransaction,
        PGSuccessNotification,
        AVideo,
        FWindow,
        PGBidForm,
        FEllipsis,
    },

    mixins: [pollingMixin],

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
        /** Pay tokens for mintable nft (with hasAuction: false) */
        mPayTokens: {
            type: Array,
            default() {
                return [];
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
            buyTx: {},
            buyTxStatus: '',
            buyInProgress: false,
            mPayToken: {},
            tokensAvailable: 0,
            totalTokens: 0,
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

        sold() {
            const { tokensAvailable } = this;

            return tokensAvailable > -1 ? 350 - this.tokensAvailable === 350 : false;
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

        buyInProgress(value) {
            if (!value) {
                this.mPayToken = {};
                this.tokenPriceB = null;
            }
        },
    },

    created() {
        this._timeoutId = -1;

        this.init();

        // console.log(toHex(bToWei(4200)));
    },

    beforeDestroy() {
        this.clearTimeout();
    },

    methods: {
        async init() {
            if (!this.auctionOn) {
                this.startCountdown(this.auctionStart);
            }

            /*if (!this.token.hasAuction) {
                const data = await getRandomTrade(RANDOM_TRADE_CONTRACT);

                this.updateAvailableTokens(data);

                this._polling.start(
                    'update-mintable-token',
                    () => {
                        this.updateMToken();
                    },
                    3000
                );
            }*/
        },

        startCountdown(endDateTs) {
            // console.log('end', endDateTs);

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

        getBuyButtonLabel(payToken) {
            /*if (!this.walletConnected) {
                return 'Connect wallet';
            }*/
            return this.sold
                ? 'Sold'
                : `Buy for ${formatTokenValue(payToken.tokenPrice, payToken.decimals)} ${payToken.label}`;
        },

        setBuyTx() {
            const web3 = new Web3();
            const tx = contracts.randomPurchase(RANDOM_TRADE_CONTRACT, this.mPayToken.address, web3);

            tx._code = 'buy';

            this.buyTx = tx;
        },

        setBuyAllowanceTx(tokenPriceB) {
            const tx = erc20Utils.erc20IncreaseAllowanceTx(
                this.mPayToken.address,
                RANDOM_TRADE_CONTRACT,
                toHex(tokenPriceB.plus(10))
            );

            tx._code = 'buy_allowance';

            console.log('set allowence', bFromTokenValue(tokenPriceB, 18).toNumber(), toHex(tokenPriceB.plus(10)));

            this.buyTx = tx;
        },

        async buyMToken(payToken) {
            this.buyInProgress = true;
            this.mPayToken = payToken;

            const tokenPriceB = toBigNumber(payToken.tokenPrice);
            const userBalanceB = await this.getUserBalance(payToken.address);

            this.tokenPriceB = tokenPriceB;

            // TMP!
            // this.onSuccessfulBuy();
            // await delay(1000);

            console.log(bFromTokenValue(tokenPriceB, payToken.decimals).toNumber());
            console.log(bFromTokenValue(userBalanceB, payToken.decimals).toNumber());

            if (tokenPriceB.isGreaterThan(userBalanceB)) {
                this.$notifications.add({
                    text: this.$t('pgNftCard.insufficientBalance', { token: payToken.label }),
                    type: 'error',
                });

                this.buyInProgress = false;

                return;
            }

            const userAllowanceB = await this.getUserAllowance(payToken.address, RANDOM_TRADE_CONTRACT);

            if (tokenPriceB.isGreaterThan(userAllowanceB)) {
                this.setBuyAllowanceTx(tokenPriceB);
            } else {
                this.setBuyTx();
            }
        },

        async updateMToken() {
            const data = await getRandomTradeTokensAmount(RANDOM_TRADE_CONTRACT);

            if (data && data.tokensAvailable) {
                this.updateAvailableTokens(data);
            }
        },

        updateAvailableTokens(data) {
            this.tokensAvailable = parseInt(data.tokensAvailable, 16);
            this.totalTokens = parseInt(data.totalTokens, 16);
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

        async getUserBalance(payTokenAddress = '') {
            return toBigNumber(await getErc20TokenBalance(this.walletAddress, payTokenAddress));
        },

        async getUserAllowance(payTokenAddress = '', contractAddress = '') {
            return toBigNumber(await getErc20TokenAllowance(this.walletAddress, payTokenAddress, contractAddress));
        },

        async onBidButtonClick() {
            if (!this.walletConnected) {
                this.walletConnected = await checkWallet();
            }

            if (this.walletConnected) {
                this.$refs.modal.show();
            }
        },

        async onBuyButtonClick(payToken) {
            if (!this.walletConnected) {
                this.walletConnected = await checkWallet();
            }

            if (this.walletConnected) {
                this.buyMToken(payToken);
            }
        },

        onBuyTransactionStatus(payload) {
            const txCode = payload.code;
            this.buyTxStatus = payload.status;

            if (this.buyTxStatus === 'success') {
                if (txCode === 'buy_allowance') {
                    this.setBuyTx();
                } else if (txCode === 'buy') {
                    this.onSuccessfulBuy();
                }
            } else if (this.buyTxStatus === 'error') {
                this.buyInProgress = false;
            }
        },

        async onSuccessfulBuy() {
            this.buyInProgress = false;
            this.$refs.buySuccessModal.show();
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
