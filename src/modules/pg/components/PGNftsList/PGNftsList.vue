<template>
    <div class="pg-nfts-list" id="nfts">
        <h2 class="h2 pg-nfts-list__header">The NFTS</h2>
        <div class="theme-pg-u-w-100" v-for="(token, index) in tokens" :key="index">
            <p-g-nft
                :token="token"
                :auction-on="AUCTION_ON"
                :auction-start="AUCTION_START"
                :pay-token="payToken"
            ></p-g-nft>
            <div v-if="index !== tokens.length - 1" class="pg-nfts-list__separator"></div>
        </div>
    </div>
</template>

<script>
import PGNft from '../PGNft/PGNft';
import { delay } from 'fantom-vue-components/src/utils/function.js';
import { getWFTMToken } from '@/modules/pg/utils.js';
import appConfig from '@/app.config.js';

const CONTRACT = '0x61af4d29f672e27a097291f72fc571304bc93521';
const AUCTION_ON = appConfig.auctionOn;
const AUCTION_START = appConfig.auctionStart;
// const SOURCES_BASE_URL = 'https://sandbox.pbro.zenithies.dev/M0qoc7s3';
const SOURCES_BASE_URL = 'pg';

const tokenOrder = [
    {
        tokenId: '0x2bdc',
        // additional data
        text: 'Azerbaijan 2021 race-worn helmet AND<br>Meet and greet with Pierre over the next 12 months',
        poster: `${SOURCES_BASE_URL}/baku.jpg`,
        // tmp data
        videoSrc: `${SOURCES_BASE_URL}/baku.mp4`,
        startingPrice: '0x878678326eac900000',
        // startingPrice$: 40000,
    },
    {
        tokenId: '0x29e1',
        text:
            'Signed promotion helmet from Brazil 2019 race weekend AND<br>Meet and greet with Pierre over the next 12 months',
        poster: `${SOURCES_BASE_URL}/brazil.jpg`,
        // tmp data
        videoSrc: `${SOURCES_BASE_URL}/brazil.mp4`,
        startingPrice: '0x5150ae84a8cdf00000',
        // startingPrice$: 10000,
    },
    {
        tokenId: '0x2636',
        text:
            'VIP experience for two people at a race weekend AND<br>Meet and greet with Pierre over the next 12 months AND<br>Signed 2021 mini-helmet and merchandising',
        poster: `${SOURCES_BASE_URL}/monza.jpg`,
        // tmp data
        videoSrc: `${SOURCES_BASE_URL}/monza.mp4`,
        startingPrice: '0x1b1ae4d6e2ef500000',
        // startingPrice$: 2000,
    },
    {
        tokenId: '0x4e23',
        text:
            'Signed Pierre Gasly Merch cap AND<br>Numbered limited edition T-shirt celebrating the first NFT drop<br><br>Additionally, 10 NFTs will be “golden tickets”, redeemable for signed mini-helmets in addition to the merchandise.',
        poster: `${SOURCES_BASE_URL}/limited_blue.jpg`,
        // tmp data
        videoSrc: `${SOURCES_BASE_URL}/limited_blue.mp4`,
        price: '0x56bc75e2d63100000',
        // price$: 200,
    },
];

const TMP_TOKENS = [
    {
        contract: '0x61af4d29f672e27a097291f72fc571304bc93521',
        tokenId: '0x153',
        name: 'Brazil 2019 Redemption',
        description:
            "November '19. Brazil - Pierre's maiden podium came as the conclusion of a rollercoaster 2019 year. A series of solid race weekends and an epic last lap fighting Lewis Hamilton concluded one of the most notable redemption story in Formula One ™.",
        image: 'https://artion7.mypinata.cloud/ipfs/QmVCCkFa3genzpq8vFTUdn3unUZ7Adejx1rqHo3s8rryG4',
        imageThumb: '/images/token/0x61aF4D29f672E27a097291F72fc571304BC93521/0x153',
        created: '2021-09-25T11:00:05+02:00',
        hasListing: false,
        hasOffer: false,
        hasAuction: true,
        hasBids: true,
        lastListing: null,
        lastTrade: null,
        lastOffer: null,
        lastBid: '2021-10-18T12:39:19+02:00',
        likes: '0x0',
        __typename: 'Token',
    },
    {
        contract: '0x61af4d29f672e27a097291f72fc571304bc93521',
        tokenId: '0x1e9c',
        name: 'Baku 2021 Podium',
        description:
            "May '21, Azerbaijan - Pierre Gasly executes a perfect weekend in Baku and secure his third podium in Formula One™, the first of 2021.",
        image: 'https://artion1.mypinata.cloud/ipfs/QmStGkA5vyxF4D9QjkntWNLUjR46qe1ZLgcPUVjYrtQw6y',
        imageThumb: '/images/token/0x61aF4D29f672E27a097291F72fc571304BC93521/0x2bdc',
        created: '2021-10-11T10:54:14+02:00',
        hasListing: false,
        hasOffer: false,
        hasAuction: true,
        hasBids: false,
        lastListing: '2021-10-14T14:22:40+02:00',
        lastTrade: null,
        lastOffer: '2021-10-14T10:43:11+02:00',
        lastBid: null,
        likes: '0x0',
        __typename: 'Token',
    },
    {
        contract: '0x61af4d29f672e27a097291f72fc571304bc93521',
        tokenId: '0x29e1',
        name: 'Brazil 2019 Redemption',
        description:
            "November '19. Brazil - Pierre's maiden podium came as the conclusion of a rollercoaster 2019 year. A series of solid race weekends and an epic last lap fighting Lewis Hamilton concluded one of the most notable redemption story in Formula One ™.",
        image: 'https://artion7.mypinata.cloud/ipfs/QmVCCkFa3genzpq8vFTUdn3unUZ7Adejx1rqHo3s8rryG4',
        imageThumb: '/images/token/0x61aF4D29f672E27a097291F72fc571304BC93521/0x29e1',
        created: '2021-09-25T11:00:05+02:00',
        hasListing: false,
        hasOffer: false,
        hasAuction: true,
        hasBids: true,
        lastListing: null,
        lastTrade: null,
        lastOffer: null,
        lastBid: '2021-10-18T12:39:19+02:00',
        likes: '0x0',
        __typename: 'Token',
    },
    {
        contract: '0x61af4d29f672e27a097291f72fc571304bc93521',
        tokenId: '0x2636',
        name: 'Monza 2020<br>First Victory',
        description:
            "September '21, Italy - Pierre puts himself into Scuderia AlphaTauri's heart by scoring the second win of the Italian team in 15 years.",
        image: 'https://artion8.mypinata.cloud/ipfs/QmeQ9ocqy6FJbUVASd8nGQqBUpAKmwGPuVV6DyDGHrbmSu',
        imageThumb: '/images/token/0x61aF4D29f672E27a097291F72fc571304BC93521/0x2636',
        created: '2021-10-15T10:37:35+02:00',
        hasListing: false,
        hasOffer: false,
        hasAuction: true,
        hasBids: false,
        lastListing: null,
        lastTrade: null,
        lastOffer: null,
        lastBid: null,
        likes: '0x0',
        __typename: 'Token',
    },
    {
        contract: '0x61af4d29f672e27a097291f72fc571304bc93521',
        tokenId: '0x4e23',
        name: "Pierre Gasly<br>'In The Making'",
        description: null,
        image: 'https://artion8.mypinata.cloud/ipfs/QmeQ9ocqy6FJbUVASd8nGQqBUpAKmwGPuVV6DyDGHrbmSu',
        imageThumb: '/images/token/0x61aF4D29f672E27a097291F72fc571304BC93521/0x2636',
        created: '2021-10-15T10:37:35+02:00',
        hasListing: false,
        hasOffer: false,
        hasAuction: false,
        hasBids: false,
        lastListing: null,
        lastTrade: null,
        lastOffer: null,
        lastBid: null,
        likes: '0x0',
        __typename: 'Token',
    },
];

export default {
    name: 'PGNftsList',

    components: { PGNft },

    data() {
        return {
            tokens: [],
            payToken: {},
            AUCTION_ON,
            AUCTION_START,
        };
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            const data = await Promise.all([this.loadTokens(CONTRACT), getWFTMToken()]);

            const lTokens = data[0];
            const wftm = data[1];
            const tokens = [];

            this.payToken = wftm;

            tokenOrder.forEach(token => {
                const lToken = lTokens.find(t => t.tokenId === token.tokenId);

                if (lToken) {
                    tokens.push({ ...lToken, ...token });
                }
            });

            this.tokens = tokens;
        },

        async loadTokens(contract) {
            console.log(contract);
            // TMP
            await delay(1);

            return TMP_TOKENS;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
