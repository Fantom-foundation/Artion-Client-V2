<template>
    <div class="nftcancellistingbutton">
        <a-button
            :label="$t('nftcancellisting.cancelListing')"
            :loading="txStatus === 'pending'"
            @click.native="onButtonClick"
        />

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';

export default {
    name: 'NftCancelListingButton',

    components: { ASignTransaction, AButton },

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
            tx: {},
            txStatus: '',
        };
    },

    methods: {
        cancelListing() {
            const web3 = new Web3();
            const { token } = this;

            if (!token || !token.contract) {
                return;
            }

            this.tx = contracts.cancelListing(token.contract, token.tokenId, web3);
        },

        onButtonClick() {
            this.cancelListing();
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    text: this.$t('nftcancellisting.cancelSuccessful'),
                    type: 'success',
                });

                this.$emit('tx-success');
            }
        },
    },
};
</script>
