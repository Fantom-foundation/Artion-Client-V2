<template>
    <div v-show="token.hasListing || showMakeOfferButton" class="nftdetailprice grid">
        <template v-if="token.hasListing && listing.unitPrice">
            <div class="nftdetailprice_label">{{ $t('nftdetailprice.currentPrice') }}</div>
            <div class="nftdetailprice_price">
                <a-token-value :value="listing.unitPrice" :token="payToken" :fraction-digits="1" no-symbol with-price />
            </div>
        </template>
        <div class="nftdetailprice_buttons">
            <a-button
                v-if="token.hasListing && !userOwnsToken"
                :loading="txStatus === 'pending'"
                @click.native="onBuyNowClick"
            >
                {{ $t('nftdetailprice.buyNow') }}
            </a-button>
            <f-button v-if="showMakeOfferButton" @click.native="onMakeOfferClick">
                {{ $t('nftdetailprice.makeOffer') }}
            </f-button>
        </div>

        <nft-make-offer-window
            ref="makeOfferWindow"
            :token="token"
            :title="$t('nftdetailprice.offer')"
            @tx-success="onMakeOfferTxSuccess"
        />

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </div>
</template>

<script>
import { checkWallet } from '@/plugins/wallet/utils.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import { getTokenOffers } from '@/modules/nfts/queries/token-offers.js';
import { compareAddresses } from '@/utils/address.js';
import { isExpired } from '@/utils/date.js';
import NftMakeOfferWindow from '@/modules/nfts/components/NftMakeOfferWindow/NftMakeOfferWindow.vue';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import AButton from '@/common/components/AButton/AButton.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';

export default {
    name: 'NftDetailPrice',

    components: { ASignTransaction, AButton, NftMakeOfferWindow, ATokenValue },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        tokenOwner: {
            type: Object,
            default() {
                return {};
            },
        },
        listing: {
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
            payToken: {},
            userMadeOffer: true,
            tx: {},
            txStatus: '',
        };
    },

    computed: {
        showMakeOfferButton() {
            return !this.userOwnsToken && !this.userMadeOffer;
        },
    },

    watch: {
        /*token: {
            handler(value) {
                if (value.hasListing) {
                    this.setPayToken();
                }
            },
            immediate: true,
        },
*/
        listing: {
            handler(value) {
                if (value.unitPrice) {
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

        buyItem() {
            const { token } = this;
            const web3 = new Web3();
            const tx = contracts.buyListedItem(token.contract, token.tokenId, this.tokenOwner.address, web3);

            console.log(this.tokenOwner.address);

            console.log(tx);

            this.tx = tx;
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

        onBuyNowClick() {
            this.buyItem();
        },

        async onMakeOfferClick() {
            const walletOk = await checkWallet();

            if (walletOk) {
                this.$refs.makeOfferWindow.show();
            }
        },

        onMakeOfferTxSuccess() {
            this.$emit('tx-success');
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    text: this.$t('nftdetailprice.buySuccessful'),
                    type: 'success',
                });

                this.$emit('tx-success');
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
