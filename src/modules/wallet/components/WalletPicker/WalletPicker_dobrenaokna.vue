<template>
    <div class="walletpicker">
        <wallet-picker-window
            :wallets="wallets"
            :title="$t('walletpicker.connectToWallet')"
            @wallet-pick="onWalletPick"
            ref="window"
        />
    </div>
</template>

<script>
import Vue from 'vue';
import WalletPickerWindow from '@/modules/wallet/components/WalletPickerWindow/WalletPickerWindow.vue';
import { WALLETS } from '@/common/constants/wallets.js';

/** Global state for WalletPicker */
const state = new Vue({
    data: {
        show: 1,
    },
});

export default {
    name: 'WalletPicker',

    components: { WalletPickerWindow },

    data() {
        return {
            wallets: WALLETS(),
        };
    },

    computed: {
        cShow() {
            console.log('??!');
            return state.show;
        },
    },

    watch: {
        cShow() {
            console.log('PIPOIJPOI');
        },
    },

    methods: {
        onWalletButtonClick() {
            this.$refs.window.show();
        },

        onWalletPick(wallet) {
            console.log('onWalletPick', wallet);
        },
    },

    show() {
        console.log('----');
        state.show = 15;
    },
};
</script>

<style scoped></style>
