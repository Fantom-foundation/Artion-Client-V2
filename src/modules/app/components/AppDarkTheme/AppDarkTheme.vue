<template>
    <div style="display: none" hidden aria-hidden="true"></div>
</template>

<script>
import FAppTheme from 'fantom-vue-components/src/components/FAppTheme/FAppTheme.vue';
import { mapState } from 'vuex';
import { SET_THEME } from '@/modules/app/store/mutations.js';

const THEME_DARK = 'theme-dark';

export default {
    name: 'AppDarkTheme',

    data() {
        return {
            prevTheme: '',
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
        theme(value) {
            FAppTheme.setTheme(value);
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
                    console.log('!!!!', this.autoDarkTheme);
                    if (this.autoDarkTheme) {
                        this.setDarkTheme(_event.matches);
                    }
                });
            }
        },

        setDarkTheme(on = false) {
            if (on) {
                this.prevTheme = FAppTheme.getTheme();
                this.$store.commit(`app/${SET_THEME}`, THEME_DARK);
            } else if (this.prevTheme) {
                this.$store.commit(`app/${SET_THEME}`, this.prevTheme);
            }
        },
    },
};
</script>
