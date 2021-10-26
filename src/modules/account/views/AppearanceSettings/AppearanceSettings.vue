<template>
    <div class="appearancesettings">
        <h1 class="mat-0">{{ $t('appearancesettings.title') }}</h1>
        <p>
            <f-dark-theme-switch
                v-model="darkTheme"
                :disabled="autoDarkThemeOn"
                :label="$t('appearancesettings.darkMode')"
            />
            <f-toggle-button
                v-model="autoDarkThemeOn"
                :label="$t('appearancesettings.autoDarkMode')"
                :data-tooltip="$t('appearancesettings.autoDarkModeInfo')"
                :aria-label="$t('appearancesettings.autoDarkModeInfo')"
            />
        </p>
    </div>
</template>

<script>
import FDarkThemeSwitch from 'fantom-vue-components/src/components/FDarkThemeSwitch/FDarkThemeSwitch.vue';
import { mapState } from 'vuex';
import { SET_AUTO_DARK_MODE, SET_THEME } from '@/modules/app/store/mutations.js';

const THEME_DARK = 'theme-dark';

export default {
    name: 'AppearanceSettings',

    components: { FDarkThemeSwitch },

    data() {
        return {
            darkTheme: false,
            autoDarkThemeOn: false,
        };
    },

    computed: {
        ...mapState('app', {
            autoDarkTheme: 'autoDarkTheme',
            theme: 'theme',
        }),
    },

    watch: {
        darkTheme(value) {
            this.$store.commit(`app/${SET_THEME}`, value ? THEME_DARK : 'theme-default');
        },

        autoDarkThemeOn(value) {
            this.$store.commit(`app/${SET_AUTO_DARK_MODE}`, value);
        },
    },

    created() {
        this.darkTheme = this.theme === THEME_DARK;
        this.autoDarkThemeOn = this.autoDarkTheme;
    },
};
</script>
