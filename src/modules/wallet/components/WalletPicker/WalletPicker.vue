<template>
    <wallet-picker-window
        :wallets="wallets"
        :title="$t('walletpicker.connectToWallet')"
        @wallet-pick="onWalletPick"
        ref="window"
        class="walletpicker"
    />
</template>

<script>
import WalletPickerWindow from '@/modules/wallet/components/WalletPickerWindow/WalletPickerWindow.vue';
import { WALLETS } from '@/common/constants/wallets.js';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import { mapState } from 'vuex';

export default {
    name: 'WalletPicker',

    components: { WalletPickerWindow },

    data() {
        return {
            wallets: WALLETS(),
        };
    },

    computed: {
        ...mapState('wallet', {
            address: 'account',
        }),
    },

    methods: {
        ...copyMethods(WalletPickerWindow, ['show'], 'window'),

        async onWalletPick(wallet) {
            // console.log('onWalletPick', this.address, wallet);
            // const nonce = await this.$wallet.getNonce(this.address);
            // console.log(nonce);
            // console.log(await this.$wallet.estimateGas({ from: this.address }));
            await this.$wallet.setWallet(wallet.id, true);
        },
    },
};
</script>

<style scoped></style>
