<template>
    <div class="nftredeem">
        <p v-if="!shippingDetailsOK">
            {{ $t('nftredeem.fillOutForm') }}
        </p>
        <!-- PG -->
        <p>
            Our team will be in touch with further details regarding the delivery of physical items and to schedule the
            meet and greet and VIP expreience.
        </p>
        <!-- /PG -->
        <p>
            <b>{{ $t('nftredeem.fillOutForm') }}</b>
        </p>

        <div v-if="shippingDetailsOK" class="tea-right pab-4">
            <a-button
                :label="$t('nftredeem.updateShippingDetails')"
                size="small"
                tertiary
                @click.native="onUpdateShippingButtonClick"
            />
        </div>

        <account-shipping-address-form
            use-user-profile-inputs
            required
            :disabled="shippingDetailsOK"
            @save-success="onSaveSuccess"
            @fields-not-ok="onFieldsNotOk"
        />

        <div v-if="shippingDetailsOK" class="pat-5">
            <f-option type="checkbox" option-size="small" v-model="terms">
                {{ $t('nftredeem.understandRedeeming') }}
            </f-option>
            <div class="tea-center pat-5">
                <a-button
                    :label="$t('nftredeem.redeem')"
                    size="large"
                    :disabled="!terms"
                    :loading="txStatus === 'pending'"
                    @click.native="onRedeemButtonClick"
                />
            </div>
        </div>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import AccountShippingAddressForm from '@/modules/account/components/AccountShippingAddressForm/AccountShippingAddressForm.vue';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import contracts from '@/utils/artion-contracts-utils.js';
import Web3 from 'web3';

export default {
    name: 'NftRedeem',

    components: { ASignTransaction, AccountShippingAddressForm, AButton },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            shippingDetailsOK: true,
            terms: false,
            tx: {},
            txStatus: '',
        };
    },

    methods: {
        redeemNFT() {
            const web3 = new Web3();
            const { token } = this;

            if (!token || !token.contract) {
                return;
            }

            this.tx = contracts.artionERC721Burn(token.contract, token.tokenId, web3);
        },

        onRedeemButtonClick() {
            if (this.terms) {
                this.redeemNFT();
            }
        },

        onUpdateShippingButtonClick() {
            this.shippingDetailsOK = false;
        },

        onSaveSuccess() {
            this.shippingDetailsOK = true;
        },

        onFieldsNotOk() {
            this.shippingDetailsOK = false;
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    text: this.$t('nftredeem.redeemingSuccessful', { name: this.token.name }),
                    type: 'success',
                });
            }

            this.$emit('transaction-status', payload);
        },
    },
};
</script>

<style scoped></style>
