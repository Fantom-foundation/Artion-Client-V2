<template>
    <f-listbox :data="data" @component-change="onListboxItemSelected" class="walletlistbox">
        <template v-slot="{ item }">
            <div class="flex juc-space-between">
                <span>{{ item.label }}</span>
                <app-iconset :icon="item.value.icon" original />
            </div>
        </template>
    </f-listbox>
</template>

<script>
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';
import { clone } from 'fantom-vue-components/src/utils';

export default {
    name: 'WalletListbox',

    components: { FListbox, AppIconset },

    props: {
        /** @type {Wallet[]} */
        wallets: {
            type: Array,
            default() {
                return [];
            },
            required: true,
        },
    },

    computed: {
        data() {
            return this.wallets.map(item => {
                return { label: item.label, value: clone(item) };
            });
        },
    },

    methods: {
        onListboxItemSelected(item) {
            this.$emit('wallet-pick', clone(item.value));
        },
    },
};
</script>
