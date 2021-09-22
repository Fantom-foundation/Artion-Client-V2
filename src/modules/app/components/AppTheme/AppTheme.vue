<template>
    <div style="display: none" hidden aria-hidden="true"></div>
</template>

<script>
import { SET_THEME } from '@/modules/app/store/mutations.js';
import { mapGetters } from 'vuex';
import { getCustomProperty, getLengthAndUnit } from 'fantom-vue-components/src/utils/css.js';
import Vue from 'vue';

/** Global state for FNetworkStatus */
const appThemeState = new Vue({
    data: {
        theme: '',
    },
});

/**
 * Sets and stores application theme.
 */
export default {
    name: 'AppTheme',

    props: {
        themes: {
            type: Array,
            default() {
                return ['default'];
            },
        },
    },

    computed: {
        ...mapGetters('app', ['theme']),

        cTheme() {
            return appThemeState.theme;
        },
    },

    watch: {
        cTheme(value) {
            const theme = value || 'default';

            /*if (!this.themes.contains[theme]) {
                throw new Error('Bad theme');
            }*/

            this.$store.commit(`app/${SET_THEME}`, theme);
            this.setTheme(theme);
        },
    },

    created() {
        this.setTheme(this.theme);
    },

    methods: {
        /**
         * @param {string} theme
         */
        setTheme(theme) {
            const themeCode = theme || 'default';
            const { documentElement } = document;
            const lu = getLengthAndUnit(getCustomProperty('--apptheme-transition-length'));

            documentElement.classList.add('theme-transition');
            documentElement.setAttribute('data-theme', themeCode);

            setTimeout(
                function() {
                    documentElement.classList.remove('theme-transition');
                },
                lu.unit ? (lu.unit === 's' ? lu.len * 1000 : lu.len) : 0
            );
        },
    },

    setTheme(theme) {
        appThemeState.theme = theme;
    },
};
</script>

<style lang="scss">
@use "style";
</style>
