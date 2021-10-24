<template>
    <div class="pg-nfts-list" id="nfts">
        <h2 class="h2 pg-nfts-list__header">The NFTS</h2>
        <div class="theme-pg-u-w-100" v-for="(token, index) in tokens" :key="index">
            <p-g-nft
                :token="token"
                :auction-on="AUCTION_ON"
                :auction-start="AUCTION_START"
                :pay-token="payToken"
                :m-pay-tokens="mPayTokens"
            ></p-g-nft>
            <div v-if="index !== tokens.length - 1" class="pg-nfts-list__separator"></div>
        </div>
    </div>
</template>

<script>
import PGNft from '../PGNft/PGNft';
import { getWFTMToken } from '@/modules/pg/utils.js';
import { getRandomTradePayTokenPrice } from '@/modules/pg/queries/random-trade.js';
import appConfig from '@/app.config.js';

const RANDOM_TRADE_CONTRACT = process.env.VUE_APP_FANTOM_RANDOM_PURCHASE_CONTRACT_ADDRESS;
const CONTRACT = '0x61af4d29f672e27a097291f72fc571304bc93521';
const AUCTION_ON = appConfig.auctionOn;
const AUCTION_START = appConfig.auctionStart;
// const SOURCES_BASE_URL = 'https://sandbox.pbro.zenithies.dev/M0qoc7s3';
const SOURCES_BASE_URL = 'pg';

const TOKENS = [
    {
        contract: '0x475631dbd805f46be62d8f87a4f07ca8afaf7e45',
        tokenId: '0x1',
        name: 'Baku 2021<br>Podium',
        description:
            "May '21, Azerbaijan - Pierre Gasly executes a perfect weekend in Baku and secure his third podium in Formula One™, the first of 2021.",

        hasAuction: true,
        text: 'Azerbaijan 2021 race-worn helmet AND<br>Meet and greet with Pierre over the next 12 months',
        poster: `${SOURCES_BASE_URL}/baku.jpg`,
        videoSrc: `${SOURCES_BASE_URL}/baku.mp4`,
        // startingPrice: '0x878678326eac900000',
    },
    {
        contract: '0x475631dbd805f46be62d8f87a4f07ca8afaf7e45',
        tokenId: '0x2',
        name: 'Brazil 2019<br>Comeback',
        description:
            "November '19. Brazil - Pierre's maiden podium came as the conclusion of a rollercoaster 2019 year. A series of solid race weekends and an epic last lap fighting Lewis Hamilton concluded one of the most notable comeback stories in Formula One ™.",

        hasAuction: true,
        text:
            'Signed promotion helmet from Brazil 2019 race weekend AND<br>Meet and greet with Pierre over the next 12 months',
        poster: `${SOURCES_BASE_URL}/brazil.jpg`,
        videoSrc: `${SOURCES_BASE_URL}/brazil.mp4`,
        // startingPrice: '0x5150ae84a8cdf00000',
    },
    {
        contract: '0x475631dbd805f46be62d8f87a4f07ca8afaf7e45',
        tokenId: '0x3',
        name: 'Monza 2020<br>First Victory',
        description:
            "September '21, Italy - Pierre puts himself into Scuderia AlphaTauri's heart by scoring the second win of the Italian team in 15 years.",

        hasAuction: true,
        text:
            'VIP experience for two people at a race weekend AND<br>Meet and greet with Pierre over the next 12 months AND<br>Signed 2021 mini-helmet and merchandising',
        poster: `${SOURCES_BASE_URL}/monza.jpg`,
        videoSrc: `${SOURCES_BASE_URL}/monza.mp4`,
        // startingPrice: '0x1b1ae4d6e2ef500000',
    },
    {
        contract: '0x61af4d29f672e27a097291f72fc571304bc93521',
        tokenId: '0x4e23',
        name: "Pierre Gasly<br>'In The Making'",
        description: null,

        hasAuction: false,
        text:
            'Signed Pierre Gasly Merch cap AND<br>Numbered limited edition T-shirt celebrating the first NFT drop<br><br>Additionally, 10 NFTs will be “golden tickets”, redeemable for signed mini-helmets in addition to the merchandise.',
        poster: `${SOURCES_BASE_URL}/limited_blue.jpg`,
        // tmp data
        videoSrc: `${SOURCES_BASE_URL}/limited_blue.mp4`,
        price: '0x56bc75e2d63100000',
    },
];

const PAY_TOKENS = [
    {
        address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        label: 'wFTM',
        img: 'img/WFTM.png',
        tokenPrice: '0x56bc75e2d63100000',
        // price: 2.308624,
        // priceDecimals: 18,
        decimals: 18,
        value: 'wftm',
    },
    {
        address: '0x09e145a1d53c0045f41aeef25d8ff982ae74dd56',
        label: 'ZOO',
        img: 'img/ZOO.png',
        tokenPrice: '0xb3a6fd21acec880000',
        // price: 1,
        // priceDecimals: 18,
        decimals: 0,
        value: 'zoo',
    },
    {
        address: '0x6c021ae822bea943b2e66552bde1d2696a53fbb7',
        label: 'TOMB',
        img: 'img/TOMB.png',
        tokenPrice: '0x56bc75e2d63100000',
        // price: 1,
        // priceDecimals: 18,
        decimals: 18,
        value: 'tomb',
    },
];

export default {
    name: 'PGNftsList',

    components: { PGNft },

    data() {
        return {
            tokens: [],
            payToken: {},
            mPayTokens: [],
            AUCTION_ON,
            AUCTION_START,
        };
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            const data = await Promise.all([this.loadMPayTokens(CONTRACT), getWFTMToken()]);

            this.mPayTokens = data[0];
            this.payToken = data[1];

            this.tokens = TOKENS;
        },

        async loadMPayTokens() {
            const prices = await Promise.all(
                PAY_TOKENS.map(payToken => getRandomTradePayTokenPrice(RANDOM_TRADE_CONTRACT, payToken.address))
            );

            return PAY_TOKENS.map((payToken, index) => {
                return { ...payToken, tokenPrice: prices[index] };
            });

            /*console.log(prices);
            return PAY_TOKENS;*/
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
