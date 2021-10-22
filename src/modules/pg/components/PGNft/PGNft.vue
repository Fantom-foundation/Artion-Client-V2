<template>
    <div class="pg-nft">
        <p-g-nft-card
            :token="token"
            :auction="auction"
            :pay-token="payToken"
            :auction-on="auctionOn"
            :auction-start="auctionStart"
            :m-pay-tokens="mPayTokens"
            @reload-auction="onReloadAuction"
        ></p-g-nft-card>

        <div class="pg-nft__text">
            <h3 class="h3" v-html="token.name">
                <!--                Baku 2021 <br />
                <span class="theme-pg-u-font-weight-normal">Podium</span>-->
            </h3>
            <p class="pg-nft__perex">
                {{ token.description }}
            </p>
            <h5 class="h5" v-if="token.hasAuction">This unique NFT is redeemable for:</h5>
            <h5 class="h5" v-else>These 350 NFTs are redeemable for:</h5>
            <p class="theme-pg-u-mb-0" v-html="token.text"></p>
            <!--            <p class="theme-pg-u-mb-0">Promotion helmet from Brazil 2019 race weekend AND</p>
            <p class="theme-pg-u-mb-0">Meet and greet with Pierre over the next 12 months AND</p>
            <p class="theme-pg-u-mb-0">Signed mini-helmet and merchandising</p>-->

            <p class="pg-nft__start-price" v-if="token.hasAuction">
                <!--                Bidding starts at {{ !auctionOn ? startingPrice : minBidAmount }} wFTM.-->
            </p>
            <!--            <p class="pg-nft__start-price" v-else-if="!token.hasAuction">
                The sale will go live on October 22rd at 3pm UTC, for purchase in wFTM, ZOO, and TOMB.
            </p>-->

            <div class="pg-nft__socials mat-7">
                <span class="pg-nft__socials-button">
                    <a
                        href="https://www.instagram.com/pierregasly"
                        target="_blank"
                        class="btn btn-lg btn-round btn-samesize"
                    >
                        <icon-instagram />
                    </a>
                </span>

                <span class="pg-nft__socials-button">
                    <a href="https://twitter.com/PierreGASLY" target="_blank" class="btn btn-lg btn-round btn-samesize">
                        <icon-twitter-white />
                    </a>
                </span>
            </div>

            <div class="pg-nft__backdrop pg-nft__backdrop--1"></div>
            <div class="pg-nft__backdrop pg-nft__backdrop--2"></div>
        </div>
    </div>
</template>

<script>
import PGNftCard from '../PGNftCard/PGNftCard';
import IconInstagram from '../../../../assets/vue-icons/IconInstagram';
import IconTwitterWhite from '../../../../assets/vue-icons/IconTwitterWhite';
import { getAuction } from '@/modules/nfts/queries/auction.js';
import { formatTokenValue } from '@/utils/formatters.js';
import { toInt, bFromWei } from '@/utils/big-number.js';
import { pollingMixin } from '@/common/mixins/polling.js';

export default {
    name: 'PGNft',

    components: {
        PGNftCard,
        IconTwitterWhite,
        IconInstagram,
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
            auction: {},
        };
    },

    computed: {
        minBidAmount() {
            const { auction } = this;

            return auction.minBidAmount ? formatTokenValue(auction.minBidAmount, this.payToken.decimals, 1) : '-';
        },

        startingPrice() {
            return toInt(bFromWei(this.token.startingPrice));
        },
    },

    created() {
        this.init();
    },

    methods: {
        init() {
            if (this.auctionOn && this.token.hasAuction) {
                this.loadAuction();

                this._polling.start(
                    'update-auction',
                    () => {
                        this.loadAuction();
                    },
                    3000
                );
            }
        },

        async loadAuction() {
            const { token } = this;

            if (this.auctionOn && token.hasAuction) {
                const auction = await getAuction(token.contract, token.tokenId);

                if (auction && JSON.stringify(this.auction) !== JSON.stringify(auction)) {
                    console.log('AUCTION', auction);
                    this.auction = auction;
                }
            }
        },

        onReloadAuction() {
            this.loadAuction();
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
