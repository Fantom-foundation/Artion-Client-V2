<template>
    <a-window ref="window" :title="title" class="fwindow-width-3" v-on="$listeners">
        <wallet-listbox :wallets="wallets" @wallet-pick="onWalletPick" />
    </a-window>
</template>

<script>
import WalletListbox from '@/modules/wallet/components/WalletListbox/WalletListbox.vue';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';

export default {
    name: 'WalletPickerWindow',

    components: { WalletListbox, AWindow },

    props: {
        /** @type {Wallet[]} */
        wallets: {
            type: Array,
            default() {
                return [];
            },
            required: true,
        },
        /** Title of the window rendered in the header. */
        title: {
            type: String,
            default: '',
        },
    },

    methods: {
        ...copyMethods(AWindow, ['show', 'hide', 'toggle'], 'window'),

        onWalletPick(wallet) {
            this.$emit('wallet-pick', wallet);

            this.hide();
        },
    },
};
</script>
