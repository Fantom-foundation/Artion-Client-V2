<template>
    <section class="appearancesettings" :aria-labelledby="id">
        <h1 :id="id" class="mat-0" data-focus>{{ $t('appearancesettings.title') }}</h1>

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

        <p>
            <a-text-direction-switch />
        </p>
    </section>
</template>

<script>
import FDarkThemeSwitch from 'fantom-vue-components/src/components/FDarkThemeSwitch/FDarkThemeSwitch.vue';
import { mapState } from 'vuex';
import { SET_AUTO_DARK_MODE, SET_THEME } from '@/modules/app/store/mutations.js';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';
import { getUniqueId } from 'fantom-vue-components/src/utils';
import ATextDirectionSwitch from '@/common/components/ATextDirectionSwitch/ATextDirectionSwitch.vue';

const THEME_DARK = 'theme-dark';

export default {
    name: 'AppearanceSettings',

    components: { ATextDirectionSwitch, FDarkThemeSwitch },

    data() {
        return {
            id: getUniqueId(),
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

    mounted() {
        focusElem(this.$el);
    },
};
</script>
