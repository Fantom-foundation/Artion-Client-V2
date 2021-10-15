<template>
    <wallet-picker-window
        :wallets="wallets"
        :title="$t('walletpicker.connectToWallet')"
        @wallet-pick="onWalletPick"
        @window-hide="onWindowHide"
        ref="window"
        class="walletpicker"
    />
</template>

<script>
import WalletPickerWindow from '@/modules/wallet/components/WalletPickerWindow/WalletPickerWindow.vue';
import { WALLETS } from '@/common/constants/wallets.js';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import { mapState } from 'vuex';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { isObject } from 'fantom-vue-components/src/utils/index.js';
import { clientInfo } from 'fantom-vue-components/src/utils/client-info.js';

export default {
    name: 'WalletPicker',

    mixins: [eventBusMixin],

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

    created() {
        this._eventBus.on('show-wallet-picker', this.onShow);
        this._resolve = null;
        this._walletPicked = false;
    },

    methods: {
        ...copyMethods(WalletPickerWindow, ['show'], 'window'),

        callResolve(walletInfo = null) {
            if (typeof this._resolve === 'function') {
                this._resolve(walletInfo);
                this._resolve = null;
            }
        },

        async onWalletPick(wallet) {
            this._walletPicked = true;

            if (wallet.id === 'metamask' && clientInfo.mobile) {
                this.callResolve();

                const url = new URL(window.location.href);

                if (url.host.indexOf('sandbox.pbro') > -1) {
                    window.location.href = 'https://metamask.app.link/dapp/sandbox.pbro.zenithies.dev/artion/';
                } else {
                    window.location.href = `https://metamask.app.link/dapp/${url.host}/`;
                }
            } else {
                const walletSet = await this.$wallet.setWallet(wallet.id, true);

                this.callResolve({ wallet, walletSet });
            }

            this._walletPicked = false;
        },

        onWindowHide() {
            if (!this._walletPicked) {
                this.callResolve();
            }
        },

        onShow(obj) {
            this.show();

            if (isObject(obj)) {
                obj.promise = new Promise(resolve => {
                    this._resolve = resolve;
                });
            }
        },
    },
};
</script>

<style scoped></style>
