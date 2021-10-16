<template>
    <div class="walletbuttonwrap">
        <wallet-button v-on="$listeners" :wallet="wallet" @click="onWalletButtonClick" id="wb" />
        <wallet-menu-popover ref="menu" attach-to="#wb" @wallet-menu="onWalletMenu" />
    </div>
</template>

<script>
import WalletButton from '@/modules/wallet/components/WalletButton/WalletButton.vue';
import { mapState } from 'vuex';
import { CHAINS } from '@/common/constants/chains.js';
import WalletMenuPopover from '@/modules/wallet/components/WalletMenuPopover/WalletMenuPopover.vue';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { getBearerToken, setUser } from '@/modules/account/auth.js';

export default {
    name: 'WalletButtonWrap',

    mixins: [eventBusMixin],

    components: { WalletMenuPopover, WalletButton },

    data() {
        return {
            wallet: {
                address: '',
                chain: '',
                avatar: '',
            },
        };
    },

    computed: {
        ...mapState('wallet', {
            address: 'account',
            chainId: 'chainId',
            userName: 'userName',
        }),
    },

    watch: {
        address: {
            handler(value) {
                this.setUser(value);

                this.wallet = { ...this.wallet, address: value || '' };
            },
            immediate: true,
        },

        chainId: {
            handler(value) {
                this.wallet = {
                    ...this.wallet,
                    chain: CHAINS[typeof value === 'string' ? parseInt(value, 16) : value] || '',
                };
            },
            immediate: true,
        },

        userName: {
            handler(value) {
                this.wallet = { ...this.wallet, userName: value };
            },
            immediate: true,
        },

        //chainId(value) {},
    },

    methods: {
        async setUser(account) {
            if (!account) {
                return;
            }

            setUser(account, !!getBearerToken());
        },

        async onWalletButtonClick() {
            if (this.$wallet.connected) {
                this.$refs.menu.show();
            } else {
                const payload = {};

                this._eventBus.emit('show-wallet-picker', payload);

                const walletInfo = await payload.promise;
                if (walletInfo && walletInfo.walletSet) {
                    this.$refs.menu.show();
                }
            }
        },

        async onWalletMenu(item) {
            if (item.action === 'logout') {
                this.$wallet.logout();
            }

            this.$refs.menu.hide();
        },
    },
};
</script>
