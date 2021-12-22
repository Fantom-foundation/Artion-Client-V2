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
        <div class="walletmenupopover_darkthemeswitch">
            <f-dark-theme-switch
                v-model="darkTheme"
                :label="$t('appearancesettings.darkMode')"
            />
        </div>
    </f-popover>
</template>

<script>
import FAccordionNavigation from 'fantom-vue-components/src/components/FAccordionNavigation/FAccordionNavigation.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
import FDarkThemeSwitch from 'fantom-vue-components/src/components/FDarkThemeSwitch/FDarkThemeSwitch.vue';
import { popoverAnimationMixin } from 'fantom-vue-components/src/mixins/popover-animation.js';
import { clone } from 'fantom-vue-components/src/utils';
import { SET_THEME } from '@/modules/app/store/mutations.js';
import { mapState } from 'vuex';

const THEME_DARK = 'theme-dark';

export default {
    name: 'WalletMenuPopover',

    inheritAttrs: false,

    mixins: [popoverAnimationMixin],

    components: { FAccordionNavigation, FPopover, FDarkThemeSwitch },

    props: {
        navigation: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            darkTheme: false,
        };
    },

    computed: {
        ...mapState('app', {
            theme: 'theme',
        }),
    },

    watch: {
        darkTheme(value) {
            this.$store.commit(`app/${SET_THEME}`, value ? THEME_DARK : 'theme-default');
        },
    },

    created() {
        this.darkTheme = this.theme === THEME_DARK;
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

<style lang="scss">
@use "style";
</style>
