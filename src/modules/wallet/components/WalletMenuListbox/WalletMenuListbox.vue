<template>
    <f-popover
        ref="popover"
        v-bind="$attrs"
        attach-position="auto-vertical-exact"
        :attach-margin="[0, 0, 0, 0]"
        :animation-in="animationIn"
        :animation-out="animationOut"
        width-as-attach
        hide-on-document-mousedown
        class="fdropdownlistbox_fwindow"
        @window-hide="$emit('window-hide', $event)"
    >
        <f-listbox ref="listbox" :data="data" @component-change="$emit('wallet-menu', $event)" class="walletlistbox" />
    </f-popover>
</template>

<script>
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
import { popoverAnimationMixin } from 'fantom-vue-components/src/mixins/popover-animation.js';
import { clone, defer } from 'fantom-vue-components/src/utils';

export default {
    name: 'WalletMenuListbox',

    inheritAttrs: false,

    mixins: [popoverAnimationMixin],

    components: { FListbox, FPopover },

    props: {},

    data() {
        return {
            data: [{ value: 'logout', label: 'Logout' }],
        };
    },

    methods: {
        show() {
            const { $refs } = this;

            $refs.popover.show();

            defer(() => {
                $refs.listbox.focus();
            });

            /*this.showPopover = true;

            this.$nextTick(() => {
                const { $refs } = this;

                $refs.popover.show();

                defer(() => {
                    $refs.listbox.focus();
                });
            });*/
        },

        hide() {
            this.$refs.popover.hide();
        },

        onListboxItemSelected(item) {
            this.$emit('wallet-pick', clone(item.value));
        },
    },
};
</script>
