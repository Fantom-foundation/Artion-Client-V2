<template>
    <div class="walletbuttonwrap">
        <wallet-button v-on="$listeners" :wallet="wallet" @click="onWalletButtonClick" id="wb" />
        <wallet-picker ref="walletPicker" />
        <wallet-menu-listbox ref="menu" attach-to="#wb" @wallet-menu="onWalletMenu" />
    </div>
</template>

<script>
import WalletButton from '@/modules/wallet/components/WalletButton/WalletButton.vue';
import { mapState } from 'vuex';
import { CHAINS } from '@/common/constants/chains.js';
import WalletMenuListbox from '@/modules/wallet/components/WalletMenuListbox/WalletMenuListbox.vue';
import WalletPicker from '@/modules/wallet/components/WalletPicker/WalletPicker.vue';

export default {
    name: 'WalletButtonWrap',

    components: { WalletPicker, WalletMenuListbox, WalletButton },

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
        }),
    },

    watch: {
        address: {
            handler(value) {
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

        //chainId(value) {},
    },

    methods: {
        onWalletButtonClick() {
            if (this.$wallet.connected) {
                this.$refs.menu.show();
            } else {
                this.$refs.walletPicker.show();
            }
        },

        onWalletMenu(item) {
            if (item.value === 'logout') {
                this.$wallet.logout();
            }

            this.$refs.menu.hide();
        },
    },
};
</script>
