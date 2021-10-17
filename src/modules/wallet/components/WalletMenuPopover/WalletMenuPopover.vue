<template>
    <f-popover
        ref="popover"
        v-bind="$attrs"
        attach-position="auto-vertical-exact"
        :attach-margin="[0, 0, 0, 0]"
        :animation-in="animationIn"
        :animation-out="animationOut"
        :prevent-focus="false"
        width-as-attach
        hide-on-document-mousedown
        class="fdropdownlistbox_fwindow"
        @window-hide="$emit('window-hide', $event)"
    >
        <f-accordion-navigation :navigation="navigation" @node-selected="onNavigationNodeSelected" />
    </f-popover>
</template>

<script>
import FAccordionNavigation from 'fantom-vue-components/src/components/FAccordionNavigation/FAccordionNavigation.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
import { popoverAnimationMixin } from 'fantom-vue-components/src/mixins/popover-animation.js';
import { clone } from 'fantom-vue-components/src/utils';

export default {
    name: 'WalletMenuPopover',

    inheritAttrs: false,

    mixins: [popoverAnimationMixin],

    components: { FAccordionNavigation, FPopover },

    props: {
        navigation: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    methods: {
        show() {
            const { $refs } = this;

            $refs.popover.show();
        },

        hide() {
            this.$refs.popover.hide();
        },

        onNavigationNodeSelected(node) {
            this.$refs.popover.hide();

            this.$emit('wallet-menu', clone(node));
        },
    },
};
</script>
