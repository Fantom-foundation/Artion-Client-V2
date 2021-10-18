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

const tokenOrder = [
    {
        tokenId: '0x1e9c',
        // additional data
        text: 'Lorem ipsum 1',
        poster: 'https://sandbox.pbro.zenithies.dev/M0qoc7s3/baku.jpg',
        // tmp data
        videoSrc: 'https://sandbox.pbro.zenithies.dev/M0qoc7s3/baku.mp4',
    },
    {
        tokenId: '0x153',
        text: 'Lorem ipsum 2',
        poster: 'https://sandbox.pbro.zenithies.dev/M0qoc7s3/brazil.jpg',
        // tmp data
        videoSrc: 'https://sandbox.pbro.zenithies.dev/M0qoc7s3/brazil.mp4',
    },
    {
        tokenId: '0x2636',
        text: 'Lorem ipsum 3',
        poster: 'https://sandbox.pbro.zenithies.dev/M0qoc7s3/monza.jpg',
        // tmp data
        videoSrc: 'https://sandbox.pbro.zenithies.dev/M0qoc7s3/monza.mp4',
    },
];

const TMP_TOKENS = [
    {
        contract: '0x61af4d29f672e27a097291f72fc571304bc93521',
        tokenId: '0x153',
        name: 'Heart Sticker',
        description: '',
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
        name: 'test nft 1',
        description: 'test nft 1 description',
        image: 'https://artion1.mypinata.cloud/ipfs/QmStGkA5vyxF4D9QjkntWNLUjR46qe1ZLgcPUVjYrtQw6y',
        imageThumb: '/images/token/0x61aF4D29f672E27a097291F72fc571304BC93521/0x1e9c',
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
        tokenId: '0x2636',
        name: 'The Lady and The Rose',
        description: 'La dama y la rosa',
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
            await delay(500);

            return TMP_TOKENS;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
