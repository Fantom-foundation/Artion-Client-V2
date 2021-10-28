<template>
    <div v-show="token.hasListing || showMakeOfferButton" class="nftdetailprice grid">
        <template v-if="token.hasListing && listing.unitPrice">
            <div class="nftdetailprice_label">
                {{ $t('nftdetail.currentPrice') }}
            </div>
            <div class="nftdetailprice_price">
                <a-token-value :value="listing.unitPrice" :token="payToken.address" :fraction-digits="1" />
                <div class="nftdetailprice_usd">({{ to$(listing.unitPrice) }})</div>
            </div>
        </template>
        <div class="nftdetailprice_buttons">
            <f-button v-if="token.hasListing && !userOwnsToken" @click.native="onBuyNowClick">
                {{ $t('nftdetail.buyNow') }}
            </f-button>
            <f-button v-if="showMakeOfferButton" @click.native="onMakeOfferClick">
                {{ $t('nftdetail.makeOffer') }}
            </f-button>
        </div>

        <nft-make-offer-window
            ref="makeOfferWindow"
            :token="token"
            :title="$t('nftdetail.offer')"
            @tx-success="onMakeOfferTxSuccess"
        />
    </div>
</template>

<script>
import { checkWallet } from '@/plugins/wallet/utils.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import { getTokenOffers } from '@/modules/nfts/queries/token-offers.js';
import { compareAddresses } from '@/utils/address.js';
import { isExpired } from '@/utils/date.js';
import NftMakeOfferWindow from '@/modules/nfts/components/NftMakeOfferWindow/NftMakeOfferWindow.vue';
import { getTokenListings } from '@/modules/nfts/queries/token-listings.js';
import { toBigNumber } from '@/utils/big-number.js';
import { formatTokenValue } from '@/utils/formatters.js';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';

export default {
    name: 'NftDetailPrice',

    components: { NftMakeOfferWindow, ATokenValue },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        userOwnsToken: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            listing: {},
            payToken: {},
            userMadeOffer: true,
        };
    },

    computed: {
        showMakeOfferButton() {
            return !this.userOwnsToken && !this.userMadeOffer;
        },
    },

    watch: {
        token: {
            handler(value) {
                if (value.hasListing) {
                    this.setListing();
                    this.setPayToken();
                }
            },
            immediate: true,
        },
    },

    methods: {
        update() {
            this.$nextTick(async () => {
                if (!this.userOwnsToken) {
                    this.userMadeOffer = await this.checkUserMadeOffer(this.token);
                }
            });
        },

        async setListing() {
            const { token } = this;

            const data = await getTokenListings(token.contract, token.tokenId, { first: 200 });
            const listings = data.edges.map(edge => edge.node);

            for (let i = 0, len = listings.length; i < len; i++) {
                if (!listings[i].closed) {
                    this.listing = listings[i];
                    break;
                }
            }

            console.log('listing', this.listing);
        },

        async setPayToken() {
            const payTokens = await PAY_TOKENS_WITH_PRICES();
            const payTokenAddress = this.listing.payToken;

            this.payToken = payTokens.find(token => token.address === payTokenAddress) || {};
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

        to$(value) {
            const { payToken } = this;
            const value$ = value ? toBigNumber(value).multipliedBy(payToken.price) : null;

            return value$ ? formatTokenValue(value$, payToken.priceDecimals, 2, true) : '';
        },

        onBuyNowClick() {},

        async onMakeOfferClick() {
            const walletOk = await checkWallet();

            if (walletOk) {
                this.$refs.makeOfferWindow.show();
            }
        },

        onMakeOfferTxSuccess() {
            this.$emit('tx-success');
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
