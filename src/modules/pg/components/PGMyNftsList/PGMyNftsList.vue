<template>
    <div class="pg-my-nfts-list">
        <h2 class="h2 pg-my-nfts-list__header">My NFTs</h2>
        <div class="pg-my-nfts-list__container">
            <p-g-nft-card-generic v-for="(token, index) in tokens" :key="index" :token="token"></p-g-nft-card-generic>
        </div>

        <div class="pg-my-nfts-list__backdrop pg-my-nfts-list__backdrop--1"></div>
        <div class="pg-my-nfts-list__backdrop pg-my-nfts-list__backdrop--2"></div>
    </div>
</template>

<script>
import PGNftCardGeneric from '../PGNftCardGeneric/PGNftCardGeneric';
import { getUserOwnershipTokens } from '@/modules/account/queries/user-ownership-tokens.js';
import { mapState } from 'vuex';

// const SOURCES_BASE_URL = 'https://sandbox.pbro.zenithies.dev/M0qoc7s3';
// const SOURCES_BASE_URL = 'pg';

const TMP_TOKENS = [
    {
        contract: '0x475631dbd805f46be62d8f87a4f07ca8afaf7e45',
        tokenId: '0x1',
        name: 'Baku 2021<br>Podium',
        description:
            "May '21, Azerbaijan - Pierre Gasly executes a perfect weekend in Baku and secure his third podium in Formula One™, the first of 2021.",

        hasAuction: true,
        text: 'Azerbaijan 2021 race-worn helmet AND<br>Meet and greet with Pierre over the next 12 months',
        imageThumb: '/images/token/0x475631Dbd805F46BE62D8F87a4f07CA8aFaF7E45/0x1',
        image: 'https://artion.mypinata.cloud/ipfs/QmePhQPfwwCWzqSTpxa2CQFCWLbDwj2PATdL6AFYRw7nFc',
        // imageThumb: `${SOURCES_BASE_URL}/baku.jpg`,
        // image: `${SOURCES_BASE_URL}/baku.mp4`,
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
        imageThumb: '/images/token/0x475631Dbd805F46BE62D8F87a4f07CA8aFaF7E45/0x2',
        image: 'https://artion.mypinata.cloud/ipfs/Qma6Yx3z4YY2gsscBUa7bPBQKfPQDdv1JehxHFG32zrxTw',
        // imageThumb: `${SOURCES_BASE_URL}/brazil.jpg`,
        // image: `${SOURCES_BASE_URL}/brazil.mp4`,
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
        imageThumb: '/images/token/0x475631Dbd805F46BE62D8F87a4f07CA8aFaF7E45/0x3',
        image: 'https://artion.mypinata.cloud/ipfs/QmNjxsiHzRVhbL1WYhxXhJsHCRgCA2bx6LtUJHVmAd3Kir',
        // imageThumb: `${SOURCES_BASE_URL}/monza.jpg`,
        // image: `${SOURCES_BASE_URL}/monza.mp4`,
        // startingPrice: '0x1b1ae4d6e2ef500000',
    },
    /*{
        contract: '0x61af4d29f672e27a097291f72fc571304bc93521',
        tokenId: '0x4',
        name: "Pierre Gasly<br>'In The Making'",
        description: null,

        hasAuction: false,
        text:
            'Signed Pierre Gasly Merch cap AND<br>Numbered limited edition T-shirt celebrating the first NFT drop<br><br>Additionally, 10 NFTs will be “golden tickets”, redeemable for signed mini-helmets in addition to the merchandise.',
        imageThumb: `${SOURCES_BASE_URL}/limited_blue.jpg`,
        // tmp data
        videoSrc: `${SOURCES_BASE_URL}/limited_blue.mp4`,
        price: '0x56bc75e2d63100000',
    },*/
];

export const CONTRACTS_FILTER = [
    // '0x61af4d29f672e27a097291f72fc571304bc93521',
    '0x475631dbd805f46be62d8f87a4f07ca8afaf7e45',
];

export default {
    name: 'PGMyNftsList',

    components: { PGNftCardGeneric },

    data() {
        return {
            tokens: [],
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        walletAddress(value) {
            if (value) {
                this.setTokens();
            } else {
                this.tokens = [];
            }
        },
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            if (this.walletAddress) {
                this.setTokens();
            }
        },

        async setTokens() {
            this.tokens = await this.loadTokens();
        },

        async loadTokens() {
            console.log(TMP_TOKENS);

            const data = await getUserOwnershipTokens(this.walletAddress, { first: 200 });
            const tokens = data.edges.map(token => token.node.token);

            console.log(tokens);

            return tokens.filter(token => CONTRACTS_FILTER.includes(token.contract));
            // return [];
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
