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

        <a-tx-window ref="makeOfferWindow" :title="$t('nftdetailprice.offer')" v-slot="{ onTxStatus }">
            <nft-make-offer-form
                :token="token"
                @transaction-status="
                    onTxStatus($event);
                    onMakeOfferTransactionStatus($event);
                "
            />
        </a-tx-window>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </div>
</template>

<script>
import { checkUserBalance, checkWallet, getUserAllowanceTx } from '@/plugins/wallet/utils.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import { getTokenOffers } from '@/modules/nfts/queries/token-offers.js';
import { compareAddresses } from '@/utils/address.js';
import { isExpired } from '@/utils/date.js';
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import AButton from '@/common/components/AButton/AButton.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import ATxWindow from '@/common/components/ATxWindow/ATxWindow.vue';
import NftMakeOfferForm from '@/modules/nfts/components/NftMakeOfferForm/NftMakeOfferForm.vue';

export default {
    name: 'NftDetailPrice',

    components: { NftMakeOfferForm, ATxWindow, ASignTransaction, AButton, ATokenValue },

    props: {
        token: {
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

        async buyItem() {
            const { listing } = this;

            if ((await checkUserBalance(listing.unitPrice, this.payToken.address, this.payToken.label)) !== null) {
                const allowanceTx = await getUserAllowanceTx({
                    value: listing.unitPrice,
                    tokenAddress: this.payToken.address,
                    contract: process.env.VUE_APP_FANTOM_MARKETPLACE_CONTRACT_ADDRESS,
                });

                console.log('allowanceTx', allowanceTx);

                if (allowanceTx) {
                    allowanceTx._code = 'buy_allowance';

                    this.tx = allowanceTx;
                } else {
                    this.setBuyTx();
                }

                // console.log(token.contract, parseInt(token.tokenId, 16), listing.owner);
            }
        },

        setBuyTx() {
            const { token } = this;
            const { listing } = this;
            const web3 = new Web3();
            const tx = contracts.buyListedItemWithPayToken(
                token.contract,
                token.tokenId,
                listing.owner,
                listing.payToken,
                web3
            );

            console.log(tx);
            tx._code = 'buy';

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

        onMakeOfferTransactionStatus(payload) {
            if (payload.status === 'success') {
                this.$emit('tx-success', 'make_offer');
            }
        },

        onTransactionStatus(payload) {
            const txCode = payload.code;
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                if (txCode === 'buy_allowance') {
                    this.setBuyTx();
                } else if (txCode === 'buy') {
                    this.$notifications.add({
                        text: this.$t('nftdetailprice.buySuccessful'),
                        type: 'success',
                    });

                    this.$emit('tx-success', 'buy');
                }
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
