<template>
    <div class="nftdetail container">
        <div class="nftdetail_main">
            <div class="nftdetail_media">
                <div class="nftdetail_img">
                    <f-image :src="getImageThumbUrl(token.imageThumb)" :alt="token.name" />
                </div>
            </div>
            <div class="nftdetail_product">
                <div class="nftdetail_infoWrap">
                    <nft-detail-collection :contract="token.contract" />

                    <div class="nftdetail_name">
                        <h1>
                            <a-placeholder block :content-loaded="!!token.tokenId" replacement-text="token name">
                                #{{ toInt(token.tokenId) }} {{ token.name }}
                            </a-placeholder>
                        </h1>
                    </div>
                    <div class="nftdetail_description">
                        {{ token.description }}
                    </div>
                    <div class="nftdetail_status">
                        <div class="nftdetail_owner">
                            {{ $t('nftdetail.owned') }}
                            <router-link
                                :to="{
                                    name: 'account',
                                    params: { address: tokenOwner.address },
                                }"
                            >
                                <a-address :owner="tokenOwner" />
                            </router-link>
                        </div>
                        <div class="nftdetail_views">
                            <app-iconset icon="view" />
                            {{ toInt(token.views) }} {{ $t('nftdetail.views') }}
                        </div>
                        <div class="nftdetail_favorites" :class="{ 'color-clicked': liked }">
                            <button aria-label="Like" :data-tooltip="$t('nftcard.favorite')">
                                <app-iconset
                                    :icon="liked ? 'liked' : 'like'"
                                    size="20px"
                                    @click.native.prevent="onLikeClick"
                                />
                            </button>
                            {{ $t('nftdetail.favorites') }}
                        </div>
                    </div>

                    <div v-if="userOwnsToken && token.contract" class="nftdetail_owneractions">
                        <template v-if="!tokenHasAuction">
                            <nft-start-auction-button v-if="!tokenHasListing" :token="token" @tx-success="update" />
                            <nft-sell-button v-if="!tokenHasListing" :token="token" @tx-success="update" />
                        </template>
                        <template v-else>
                            <nft-cancel-auction-button :token="token" @tx-success="update" />
                            <nft-update-auction-button v-if="!auctionHasFinished" :token="token" @tx-success="update" />
                        </template>

                        <template v-if="tokenHasListing">
                            <nft-cancel-listing-button :token="token" @tx-success="update" />
                            <nft-update-listing-button :token="token" :listing="listing" @tx-success="update" />
                        </template>
                    </div>

                    <nft-detail-price
                        ref="nftDetailPrice"
                        :token="token"
                        :listing="listing"
                        :user-owns-token="userOwnsToken"
                        @tx-success="onNftDetailPriceTxSuccess"
                    />

                    <a-share-button />
                </div>
            </div>
            <div class="nftdetail_data">
                <nft-auction
                    v-if="tokenHasAuction"
                    :user-owns-token="userOwnsToken"
                    :auction="auction"
                    :token="token"
                    @tx-success="update"
                />

                <!-- TO DO -->
                <a-details hidden>
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="graf" /> {{ $t('nftdetail.priceHistory') }}
                        </div>
                    </template>
                    PriceHistory component
                </a-details>

                <a-details class="adetails_p0">
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="tag" /> {{ $t('nftdetail.listings') }}
                        </div>
                    </template>
                    <template>
                        <nft-listings-grid
                            ref="listingsGrid"
                            :token="token"
                            :user-owns-token="userOwnsToken"
                            @tx-success="update"
                        />
                    </template>
                </a-details>
                <a-details class="adetails_p0">
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="list" /> {{ $t('nftdetail.directOffers') }}
                        </div>
                    </template>
                    <nft-direct-offers-grid
                        ref="directOffersGrid"
                        :token="token"
                        :user-owns-token="userOwnsToken"
                        @tx-success="update"
                    />
                </a-details>
            </div>

            <!-- TO DO -->
            <a-details-group hidden class="nftdetail_info" rounded>
                <a-details>
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="property" /> {{ $t('nftdetail.properties') }}
                        </div>
                    </template>
                    <template>
                        <div class="nftdetail_property">
                            <div class="nftdetail_property_item">
                                <span>{{ $t('nftdetail.symbol') }}:</span> ARTY
                            </div>
                            <div class="nftdetail_property_item">
                                <span>{{ $t('nftdetail.royalty') }}:</span> 0.01%
                            </div>
                            <div class="nftdetail_property_item">
                                <span>{{ $t('nftdetail.recipient') }}:</span>
                                <a target="_blank" href="#">0xfbB8...0a80</a>
                            </div>
                            <div class="nftdetail_property_item">
                                <span>{{ $t('nftdetail.ipRights') }}:</span> {{ $t('nftdetail.notAvailable') }}
                            </div>
                            <div class="nftdetail_property_item">
                                <span>{{ $t('nftdetail.collection') }}:</span> {{ $t('nftdetail.nftCollection') }}
                            </div>
                        </div>
                    </template>
                </a-details>
                <a-details class="title_wrap">
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="about" /> {{ $t('nftdetail.about') }} Rarity Names
                        </div>
                    </template>
                    <template>
                        <div class="nftdetail_about">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque, perspiciatis animi eum
                            consequuntur temporibus nulla, iusto minus cumque suscipit architecto quasi! Iusto, expedita
                            quos nostrum dolores adipisci deleniti fugit!
                        </div>
                        <div class="nftdetail_socialBlock">
                            <a href="#" class="nftdetail_socialLink" target="_blank">
                                <app-iconset icon="web" />
                            </a>
                            <a href="#" class="nftdetail_socialLink" target="_blank">
                                <app-iconset icon="twitter" />
                            </a>
                            <a href="#" class="nftdetail_socialLink" target="_blank">
                                <app-iconset icon="telegram" />
                            </a>
                            <a href="#" class="nftdetail_socialLink" target="_blank">
                                <app-iconset icon="discord" />
                            </a>
                        </div>
                    </template>
                </a-details>
                <a-details>
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="chain" />{{ $t('nftdetail.chainInfo') }}
                        </div>
                    </template>
                    <template>
                        <div class="nftdetail_chainBlock">
                            <div class="nftdetail_chainLine">
                                <span>{{ $t('nftdetail.collection') }}</span>
                                <a href="#" target="_blank">0x1DaD...79B9</a>
                            </div>
                            <div class="nftdetail_chainLine">
                                <span>{{ $t('nftdetail.network') }}</span>
                                <span>{{ $t('nftdetail.fantomOpera') }}</span>
                            </div>
                            <div class="nftdetail_chainLine">
                                <span>{{ $t('nftdetail.chainId') }}</span>
                                <span>250</span>
                            </div>
                        </div>
                    </template>
                </a-details>
            </a-details-group>
        </div>

        <!-- TO DO -->
        <div hidden class="nftdetail_filter">
            <nft-trade-history-grid />
        </div>

        <div class="nftdetail_collection">
            <a-details>
                <template #label>
                    <div class="nftdetail_details_wrap">
                        <app-iconset icon="collection" /> {{ $t('nftdetail.fromCollection') }}
                    </div>
                </template>
                <template>
                    <nft-more-from-collection-list :token="token" />
                </template>
            </a-details>
        </div>

        <a-sign-transaction :tx="tx" hidden />
    </div>
</template>

<script>
import ADetailsGroup from '@/common/components/ADetailsGroup/ADetailsGroup';
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import ADetails from '@/common/components/ADetails/ADetails';
import AShareButton from '@/common/components/AShareButton/AShareButton';
import NftListingsGrid from '@/modules/nfts/components/NftListingsGrid/NftListingsGrid.vue';
import NftDirectOffersGrid from '@/modules/nfts/components/NftDirectOffersGrid/NftDirectOffersGrid';
import NftTradeHistoryGrid from '@/modules/nfts/components/NftTradeHistoryGrid/NftTradeHistoryGrid';
import { toHex, toInt } from '@/utils/big-number.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { getImageThumbUrl } from '@/utils/url.js';
import { getTokens } from '@/modules/nfts/queries/tokens.js';
import { getToken } from '@/modules/nfts/queries/token.js';
import { getUserFavoriteTokens } from '@/modules/account/queries/user-favorite-tokens.js';
import { likeToken, unlikeToken } from '@/modules/nfts/mutations/likes.js';
import { getBearerToken, signIn } from '@/modules/account/auth.js';
import { mapState } from 'vuex';
import NftAuction from '@/modules/nfts/components/NftAuction/NftAuction.vue';

import NftMoreFromCollectionList from '@/modules/nfts/components/NftMoreFromCollectionList/NftMoreFromCollectionList.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import NftCancelListingButton from '@/modules/nfts/components/NftCancelListingButton/NftCancelListingButton.vue';
import NftSellButton from '@/modules/nfts/components/NftSellButton/NftSellButton.vue';
import NftDetailPrice from '@/modules/nfts/components/NftDetailPrice/NftDetailPrice.vue';
import { incrementTokenViews } from '@/modules/nfts/mutations/views';
import { getTokenListings } from '@/modules/nfts/queries/token-listings.js';
import { getTokenOwnerships } from '@/modules/nfts/queries/token-ownerships.js';
import NftUpdateListingButton from '@/modules/nfts/components/NftUpdateListingButton/NftUpdateListingButton.vue';
import NftStartAuctionButton from '@/modules/nfts/components/NftStartAuctionButton/NftStartAuctionButton.vue';
import NftCancelAuctionButton from '@/modules/nfts/components/NftCancelAuctionButton/NftCancelAuctionButton.vue';
import NftUpdateAuctionButton from '@/modules/nfts/components/NftUpdateAuctionButton/NftUpdateAuctionButton.vue';
import { getAuction } from '@/modules/nfts/queries/auction.js';
import { isExpired } from '@/utils/date.js';
import NftDetailCollection from '@/modules/nfts/components/NftDetailCollection/NftDetailCollection.vue';

export default {
    name: 'NftDetail',

    mixins: [eventBusMixin],

    components: {
        NftDetailCollection,
        NftUpdateAuctionButton,
        NftCancelAuctionButton,
        NftStartAuctionButton,
        NftUpdateListingButton,
        NftDetailPrice,
        NftSellButton,
        NftCancelListingButton,
        AAddress,
        NftAuction,
        ASignTransaction,
        ADetails,
        ADetailsGroup,
        AppIconset,
        AShareButton,
        NftListingsGrid,
        NftDirectOffersGrid,
        NftTradeHistoryGrid,
        NftMoreFromCollectionList,
    },

    data() {
        return {
            token: {},
            likesCount: 7,
            liked: false,
            // token is created by user
            userCreatedToken: false,
            userOwnsToken: false,
            listing: {},
            /** @type {Auction} */
            auction: {},
            tokenOwner: {},
            tx: {},
            likedNftIds: [],
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        tokenHasListing() {
            return !!this.listing.unitPrice && !this.listing.closed;
        },

        tokenHasAuction() {
            const { auction } = this;

            return this.token.hasAuction || (auction.contract ? !auction.closed : false);
        },

        auctionHasFinished() {
            return isExpired(this.auction.endTime);
        },
    },

    watch: {
        walletAddress(value) {
            this.onWalletAddressChange(value);
            // this.getFavoriteNfts(value);
        },

        $route() {
            this.init();
        },
    },

    created() {
        const routeParams = this.$route.params;

        this.init();

        incrementTokenViews(routeParams.tokenContract, toHex(routeParams.tokenId));
    },

    methods: {
        async init() {
            const routeParams = this.$route.params;

            if (!routeParams.tokenContract || !routeParams.tokenId) {
                this.$router.push({ name: '404' });
            } else {
                this.update();
            }
        },

        async update() {
            const routeParams = this.$route.params;

            this.tokenOwner = await this.getTokenOwner(routeParams.tokenContract, routeParams.tokenId);
            this.token = await getToken(routeParams.tokenContract, toHex(routeParams.tokenId));

            if (this.auction.contract) {
                setTimeout(() => {
                    this.loadAuction();
                }, 500);
            } else {
                await this.loadAuction();
            }

            console.log('token: ', this.token);
            console.log('auction: ', JSON.stringify(this.auction));

            this.onWalletAddressChange();
            this.isUserFavorite(this.walletAddress);
        },

        async loadAuction() {
            this.auction = (await getAuction(this.token.contract, this.token.tokenId)) || {};
        },

        async onWalletAddressChange() {
            const { $wallet } = this;

            this.userCreatedToken = await this.checkUserCreatedToken(this.token);

            if ($wallet.connected && $wallet.account) {
                this.userOwnsToken = this.tokenOwner.address === $wallet.account;
            } else {
                this.userOwnsToken = false;
            }

            await this.$refs.nftDetailPrice.update();
            await this.setListing();
        },

        async isUserFavorite(value) {
            if (value) {
                let pagination = { first: 20 };
                let { edges } = await getUserFavoriteTokens(value, pagination);
                if (edges.length) {
                    this.likedNftIds = edges.map(edge => {
                        return edge.node.tokenId;
                    });
                    if (this.likedNftIds.includes(this.token.tokenId)) {
                        this.liked = true;
                        return;
                    }
                    this.liked = false;
                }
            }
        },

        /**
         * Checks, if user created the token
         *
         * @param {Object} token
         * @return {Promise<boolean>}
         */
        async checkUserCreatedToken(token) {
            let created = false;

            if (this.$wallet.connected && this.$wallet.account) {
                const tokens = await getTokens({}, { filter: { createdBy: this.$wallet.account } });

                created =
                    tokens.edges.findIndex(
                        edge => edge.node.tokenId === token.tokenId && edge.node.contract === token.contract
                    ) > -1;
            }

            return created;
        },

        /**
         * @param {string} tokenContract
         * @param {string} tokenId
         * @return {Promise<Object>}
         */
        async getTokenOwner(tokenContract, tokenId) {
            const data = await getTokenOwnerships(tokenContract, tokenId, { first: 200 });

            return data.edges.length > 0 ? data.edges[0].node.ownerUser : {};
        },

        async checkWalletConnection() {
            if (!this.$wallet.connected) {
                const payload = {};
                this._eventBus.emit('show-wallet-picker', payload);
                let res = await payload.promise;
                return res;
            }
        },

        async setListing() {
            const { token } = this;

            const data = await getTokenListings(token.contract, token.tokenId, { first: 200 });
            const listings = data.edges.map(edge => edge.node);

            this.listing = {};

            for (let i = 0, len = listings.length; i < len; i++) {
                if (!listings[i].closed) {
                    this.listing = listings[i];
                    break;
                }
            }
        },

        onNftDetailPriceTxSuccess(code) {
            const { $refs } = this;

            if (code === 'make_offer') {
                this.onWalletAddressChange();
                if ($refs.directOffersGrid) {
                    $refs.directOffersGrid.update();
                }
            } else if (code === 'buy') {
                this.update();
            }
        },

        async onLikeClick() {
            let ok = true;
            await this.checkWalletConnection();
            if (!getBearerToken()) {
                ok = await signIn();
            }
            if (ok) {
                if (!this.liked) {
                    await likeToken(this.token);
                    this.liked = true;
                    this.$emit('nft-like');
                    this.$notifications.add({
                        type: 'success',
                        text: `You successfully added ${this.token.name} to your favorites`,
                    });
                } else {
                    await unlikeToken(this.token);
                    this.liked = false;
                    this.$emit('nft-unlike');
                    this.$notifications.add({
                        type: 'success',
                        text: `You successfully delete ${this.token.name} from your favorites`,
                    });
                }
            } else {
                this.$notifications.add({
                    type: 'error',
                    text: 'Some problems',
                });
            }
        },

        toInt,
        getImageThumbUrl,
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
