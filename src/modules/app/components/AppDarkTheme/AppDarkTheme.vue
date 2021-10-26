<template>
    <div style="display: none" hidden aria-hidden="true"></div>
</template>

<script>
import FAppTheme from 'fantom-vue-components/src/components/FAppTheme/FAppTheme.vue';
import { mapState } from 'vuex';

const THEME_DARK = 'theme-dark';

export default {
    name: 'AppDarkTheme',

    data() {
        return {
            prevTheme: 'theme-default',
            prefersColorScheme: null,
        };
    },

    computed: {
        ...mapState('app', {
            autoDarkTheme: 'autoDarkTheme',
            theme: 'theme',
        }),
    },

    watch: {
        theme: {
            handler(value) {
                FAppTheme.setTheme(value);
            },
            immediate: true,
        },

        autoDarkTheme(value) {
            this.setDarkTheme(
                value && this.prefersColorScheme ? this.prefersColorScheme.matches : this.theme === THEME_DARK
            );
        },
    },

    created() {
        this.setPrefersColorScheme();
        this.setDarkTheme(
            this.autoDarkTheme && this.prefersColorScheme ? this.prefersColorScheme.matches : this.theme === THEME_DARK
        );
    },

    methods: {
        setPrefersColorScheme() {
            this.prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

            if (this.prefersColorScheme) {
                this.prefersColorScheme.addEventListener('change', _event => {
                    if (this.autoDarkTheme) {
                        this.setDarkTheme(_event.matches);
                    }
                });
            }
        },

        setDarkTheme(on = false) {
            this.$nextTick(() => {
                if (on) {
                    this.prevTheme = FAppTheme.getTheme();
                    FAppTheme.setTheme(THEME_DARK);
                } else if (this.prevTheme) {
                    FAppTheme.setTheme(this.prevTheme);
                }
            });
        },
    },
};
</script>
