<template>
    <div class="pg-nft">
        <p-g-nft-card
            :token="token"
            :auction="auction"
            :pay-token="payToken"
            :auction-on="auctionOn"
            :auction-start="auctionStart"
        ></p-g-nft-card>

        <div class="pg-nft__text">
            <h3 class="h3">
                {{ token.name }}
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

            <p class="pg-nft__start-price" v-if="auctionOn && token.hasAuction">
                Bidding starts at {{ startingPrice }} wFTM.
            </p>
            <p class="pg-nft__start-price" v-else>The sale will go live on October 22rd at 2pm UTC.</p>

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

export default {
    name: 'PGNft',

    components: {
        PGNftCard,
        IconTwitterWhite,
        IconInstagram,
    },

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

            return auction.minBidAmount ? formatTokenValue(auction.minBidAmount, this.payToken.priceDecimals, 1) : '-';
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
            this.loadAuction();
        },

        async loadAuction() {
            const { token } = this;

            if (this.auctionOn) {
                const auction = await getAuction(token.contract, token.tokenId);

                console.log('AUCTION', auction);
                if (auction) {
                    this.auction = auction;
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
