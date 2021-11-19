<template>
    <div class="walletbuttonwrap">
        <wallet-button v-on="$listeners" :wallet="wallet" @click="onWalletButtonClick" id="wb" />
        <wallet-menu-popover
            class="walletbuttonmenu"
            ref="menu"
            :navigation="walletMenu"
            attach-to="#wb"
            @wallet-menu="onWalletMenu"
        />
    </div>
</template>

<script>
import WalletButton from '@/modules/wallet/components/WalletButton/WalletButton.vue';
import { mapState } from 'vuex';
import { CHAINS } from '@/common/constants/chains.js';
import WalletMenuPopover from '@/modules/wallet/components/WalletMenuPopover/WalletMenuPopover.vue';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { getImageThumbUrl } from '@/utils/url.js';

export default {
    name: 'WalletButtonWrap',

    mixins: [eventBusMixin],

    components: { WalletMenuPopover, WalletButton },

    props: {
        walletMenu: {
            type: Array,
            default() {
                return [
                    {
                        label: this.$t('walletMenu.profile'),
                        route: 'account',
                    },
                    {
                        label: this.$t('walletMenu.settings'),
                        route: 'account-settings',
                    },
                    {
                        label: this.$t('walletMenu.collection'),
                        route: 'collection-register',
                    },
                    {
                        label: this.$t('walletMenu.logout'),
                        action: 'logout',
                    },
                ];
            },
        },
    },

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
            walletAddress: 'account',
            chainId: 'chainId',
            userName: 'userName',
            userAvatar: 'userAvatar',
        }),
    },

    watch: {
        walletAddress: {
            handler(value) {
                this.wallet = {
                    ...this.wallet,
                    address: value || '',
                };
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

        userAvatar: {
            handler(value) {
                this.wallet = { ...this.wallet, avatar: value ? getImageThumbUrl(value) : '' };
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

                const walletInfo = await payload.promise;
                if (walletInfo && walletInfo.walletSet) {
                    // this.$refs.menu.show();
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

<style lang="scss">
@use 'style.scss';
</style>
