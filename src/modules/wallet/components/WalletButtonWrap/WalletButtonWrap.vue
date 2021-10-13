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
import { getUser } from '@/modules/account/queries/user.js';
import { getLoggedUser } from '@/modules/account/queries/logged-user.js';
// import { updateUser } from '@/modules/account/mutations/update-user.js';
import { signIn } from '@/modules/account/auth.js';
import WalletMenuPopover from '@/modules/wallet/components/WalletMenuPopover/WalletMenuPopover.vue';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';

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
        async onWalletButtonClick() {
            if (this.$wallet.connected) {
                this.$refs.menu.show();
            } else {
                const payload = {};

                this._eventBus.emit('show-wallet-picker', payload);

                const walletPicked = !!(await payload.promise);
                if (walletPicked) {
                    this.$refs.menu.show();
                }
            }
        },

        async onWalletMenu(item) {
            if (item.action === 'logout') {
                this.$wallet.logout();
            } else if (item.action === 'login') {
                // tmp
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
