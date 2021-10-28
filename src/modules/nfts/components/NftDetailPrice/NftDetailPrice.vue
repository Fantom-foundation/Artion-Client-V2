<template>
    <div v-show="token.hasListing || showMakeOfferButton" class="nftdetailprice grid">
        <template v-if="token.hasListing">
            <div class="nftdetailprice_label">
                {{ $t('nftdetail.currentPrice') }}
            </div>
            <div class="nftdetailprice_wrap">
                <a-token-value value="0x0001" :token="token.payToken" />
                <div class="nftdetail_currentPrice_usd">($71644.838)</div>
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
            userMadeOffer: true,
        };
    },

    computed: {
        showMakeOfferButton() {
            return !this.userOwnsToken && !this.userMadeOffer;
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
                console.log('walletAddress', walletAddress);

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
