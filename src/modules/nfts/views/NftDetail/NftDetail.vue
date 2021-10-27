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
                    <div class="nftdetail_category">Spooky Skeletoons</div>
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
                    <nft-detail-status />
                    <div class="nftdetail_status">
                        <div class="nftdetail_owner">
                            {{ $t('nftdetail.owned') }}
                            <router-link
                                :to="{
                                    name: 'account',
                                    params: { address: '0x0F715e6B91dC24c09CfEDefcC04Cb7e9E5eF06B0' },
                                }"
                            >
                                <a-address
                                    img-src="img/tmp/owner-avatar.png"
                                    address="0x0F715e6B91dC24c09CfEDefcC04Cb7e9E5eF06B0"
                                />
                            </router-link>
                        </div>
                        <div class="nftdetail_views">
                            <app-iconset icon="view" />
                            N {{ $t('nftdetail.views') }}
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

                    <div class="mat-5">
                        <f-button
                            v-if="userOwnsToken && !token.hasAuction"
                            :label="$t('nftdetail.startAuction')"
                            @click.native="onStartAuctionClick"
                        />
                    </div>

                    <div class="nftdetail_currentPrice">
                        <div class="nftdetail_currentPrice_item nftdetail_currentPrice_label">
                            {{ $t('nftdetail.currentPrice') }}
                        </div>
                        <div class="nftdetail_currentPrice_item nftdetail_currentPrice_wrap">
                            <div class="nftdetail_currentPrice_logo"><img src="/img/tmp/ftm.png" alt="FTM" /></div>
                            <div class="nftdetail_currentPrice_num">5000</div>
                            <div class="nftdetail_currentPrice_usd">($71644.838)</div>
                        </div>
                        <div class="nftdetail_currentPrice_item nftdetail_currentPrice_btn">
                            <f-button @click.native="onBuyNowClick">{{ $t('nftdetail.buyNow') }}</f-button>
                            <f-button v-if="showMakeOfferButton" @click.native="onMakeOfferClick">
                                {{ $t('nftdetail.makeOffer') }}
                            </f-button>
                        </div>
                    </div>
                    <a-share-button />
                </div>
            </div>
            <div class="nftdetail_data">
                <nft-auction v-if="token.hasAuction" :token="token" />

                <a-details>
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
                        <NftListingsGrid />
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
                        @tx-success="onOfferTxSuccess"
                    />
                </a-details>
            </div>
            <a-details-group class="nftdetail_info" rounded>
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
        <div class="nftdetail_filter">
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
        <!--        <nft-make-offer-window ref="window" :title="$t('nftdetail.offer')" />-->

        <a-window ref="makeOfferWindow" :title="$t('nftdetail.offer')" class="fwindow-width-4">
            <nft-make-offer-form :token="token" @tx-success="onMakeOfferTxSuccess" />
        </a-window>

        <a-window ref="startAuctionWindow" :title="$t('nftdetail.startAuction')" class="fwindow-width-5">
            <nft-start-auction-form :token="token" />
        </a-window>

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
import NftMakeOfferForm from '@/modules/nfts/components/NftMakeOfferForm/NftMakeOfferForm.vue';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { getImageThumbUrl } from '@/utils/url.js';
import { getTokens } from '@/modules/nfts/queries/tokens.js';
import { getToken } from '@/modules/nfts/queries/token.js';
import { getUserFavoriteTokens } from '@/modules/account/queries/user-favorite-tokens.js';
import { likeToken, unlikeToken } from '@/modules/nfts/mutations/likes.js';
import { getBearerToken, signIn } from '@/modules/account/auth.js';
import { mapState } from 'vuex';
import NftStartAuctionForm from '@/modules/nfts/components/NftStartAuctionForm/NftStartAuctionForm.vue';
import NftAuction from '@/modules/nfts/components/NftAuction/NftAuction.vue';
import { checkWallet } from '@/plugins/wallet/utils.js';

import NftMoreFromCollectionList from '@/modules/nfts/components/NftMoreFromCollectionList/NftMoreFromCollectionList.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import NftDetailStatus from '@/modules/nfts/components/NftDetailStatus/NftDetailStatus.vue';
import { getTokenOffers } from '@/modules/nfts/queries/token-offers.js';
import { compareAddresses } from '@/utils/address.js';
import { isExpired } from '@/utils/date.js';
import { getUserOwnershipTokens } from '@/modules/account/queries/user-ownership-tokens.js';

export default {
    name: 'NftDetail',

    mixins: [eventBusMixin],

    components: {
        NftDetailStatus,
        AAddress,
        NftAuction,
        NftStartAuctionForm,
        NftMakeOfferForm,
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
            userMadeOffer: true,
            tx: {},
            likedNftIds: [],
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        showMakeOfferButton() {
            console.log(this.userOwnsToken, this.userMadeOffer);
            return !this.userOwnsToken && !this.userMadeOffer;
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
        this.init();
    },

    methods: {
        async init() {
            const routeParams = this.$route.params;

            if (!routeParams.tokenContract || !routeParams.tokenId) {
                this.$router.push({ name: '404' });
            } else {
                this.token = await getToken(routeParams.tokenContract, toHex(routeParams.tokenId));

                console.log(this.token);

                this.onWalletAddressChange();
                this.isUserFavorite(this.walletAddress);
            }
        },

        async onWalletAddressChange() {
            this.userCreatedToken = await this.checkUserCreatedToken(this.token);
            this.userOwnsToken = await this.checkUserOwnsToken(this.token);

            if (!this.userOwnsToken) {
                this.userMadeOffer = await this.checkUserMadeOffer(this.token);
            }
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
         * Checks, if user created the token
         *
         * @param {Object} token
         * @return {Promise<boolean>}
         */
        async checkUserOwnsToken(token) {
            let owns = false;

            if (this.$wallet.connected && this.$wallet.account) {
                const tokens = await getUserOwnershipTokens(this.$wallet.account, { first: 200 });

                owns =
                    tokens.edges.findIndex(
                        edge => edge.node.tokenId === token.tokenId && edge.node.contract === token.contract
                    ) > -1;

                console.log('owns?', owns);
            }

            return owns;
        },

        /**
         * Checks, if user made an offer
         *
         * @param {Object} token
         * @return {Promise<boolean>}
         */
        async checkUserMadeOffer(token) {
            let madeOffer = false;
            const walletAddress = this.$wallet.account;

            if (this.$wallet.connected && walletAddress) {
                const offers = await getTokenOffers(token.contract, token.tokenId, { first: 200 });

                madeOffer =
                    offers.edges.findIndex(edge => {
                        const offer = edge.node;

                        return (
                            !offer.closed &&
                            compareAddresses(offer.proposedBy, walletAddress) &&
                            !isExpired(offer.deadline)
                        );
                    }) > -1;
            }

            return madeOffer;
        },

        async checkWalletConnection() {
            if (!this.$wallet.connected) {
                const payload = {};
                this._eventBus.emit('show-wallet-picker', payload);
                let res = await payload.promise;
                return res;
            }
        },

        onBuyNowClick() {},

        async onMakeOfferClick() {
            const walletOk = await checkWallet();

            if (walletOk) {
                this.$refs.makeOfferWindow.show();
            }
        },

        onStartAuctionClick() {
            if (!this.token.hasAuction && this.userCreatedToken) {
                this.$refs.startAuctionWindow.show();
            }
        },

        onMakeOfferTxSuccess() {
            const { $refs } = this;

            $refs.makeOfferWindow.hide();

            // this.init();
            this.onWalletAddressChange();
            if ($refs.directOffersGrid) {
                $refs.directOffersGrid.update();
            }
        },

        onOfferTxSuccess() {
            this.onWalletAddressChange();
            // this.init();
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
