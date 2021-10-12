<template>
    <div class="walletbuttonwrap">
        <wallet-button v-on="$listeners" :wallet="wallet" @click="onWalletButtonClick" id="wb" />
        <wallet-picker ref="walletPicker" />
        <wallet-menu-popover ref="menu" attach-to="#wb" @wallet-menu="onWalletMenu" />
    </div>
</template>

<script>
import WalletButton from '@/modules/wallet/components/WalletButton/WalletButton.vue';
import { mapState } from 'vuex';
import { CHAINS } from '@/common/constants/chains.js';
import WalletPicker from '@/modules/wallet/components/WalletPicker/WalletPicker.vue';
import { getUser } from '@/modules/account/queries/user.js';
import { getLoggedUser } from '@/modules/account/queries/logged-user.js';
// import { updateUser } from '@/modules/account/mutations/update-user.js';
import { logOut, signIn } from '@/modules/account/auth.js';
import WalletMenuPopover from '@/modules/wallet/components/WalletMenuPopover/WalletMenuPopover.vue';

export default {
    name: 'WalletButtonWrap',

    components: { WalletMenuPopover, WalletPicker, WalletButton },

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

        async onWalletMenu(item) {
            if (item.value === 'logout') {
                this.$wallet.logout();
                logOut();
            } else if (item.value === 'login') {
                await signIn();
                const userInfo = await getUser(this.$wallet.account);
                // await updateUser({ username: 'test', bio: 'test user bio', email: 'testuser@test.org' });
                console.log('userInfo', userInfo);
                console.log('logged user', await getLoggedUser()); // null
            }

            this.$refs.menu.hide();
        },
    },
};
</script>
