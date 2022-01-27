<template>
    <f-form class="nfttransferform grid" v-model="values" @submit="onSubmit" :aria-label="$t('nfttransfer.transfer')">
        <f-form-input
            name="address"
            :label="$t('nfttransfer.address')"
            :validator="addressValidator"
            field-size="large"
            validate-on-input
        />

        <div class="fform_buttons">
            <a-button type="submit" size="large" :loading="txStatus === 'pending'">
                {{ $t('nfttransfer.transfer') }}
            </a-button>
        </div>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </f-form>
</template>
<script>
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import AButton from '@/common/components/AButton/AButton.vue';
import { wallet } from '@/plugins/wallet/Wallet.js';
import Web3 from 'web3';
import erc721utils from '@/utils/erc721-utils';

export default {
    name: 'NftTransferForm',

    components: { AButton, ASignTransaction },

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
            values: {
                address: '',
            },
            tx: {},
            txStatus: '',
        };
    },

    methods: {
        async transferItem(values) {
            const { token } = this;
            this.tx = erc721utils.erc721TransferFrom(token.contract, wallet.getUser(), values.address, token.tokenId);
        },

        addressValidator(_address) {
            if (!Web3.utils.isHexStrict(_address) || !Web3.utils.isAddress(_address)) {
                return this.$t('nfttransfer.invalidAddress');
            }
            return '';
        },

        onSubmit(data) {
            this.transferItem(data.values);
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('nfttransfer.transferSuccessful'),
                });
            }

            this.$emit('transaction-status', payload);
        },
    },
};
</script>
