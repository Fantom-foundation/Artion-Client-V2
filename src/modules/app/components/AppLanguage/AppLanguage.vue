<template>
    <div style="display: none" hidden aria-hidden="true"></div>
</template>

<script>
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { SET_LANGUAGE } from '@/modules/app/store/mutations.js';
import { mapGetters } from 'vuex';
import { getLanguageCode } from 'fantom-vue-components/src/utils/client-info.js';
import appConfig from '@/app.config.js';
import { translations } from 'fantom-vue-components/src/mixins/translations.js';
import { clone, defer } from 'fantom-vue-components/src/utils';
import { loadLanguage } from '@/plugins/vue-i18n.js';

export default {
    name: 'AppLanguage',

    mixins: [eventBusMixin],

    computed: {
        ...mapGetters('app', ['language']),
    },

    created() {
        this._languages = clone(appConfig.settings.languages);

        this.setLanguage();

        this._eventBus.on('set-language', this.setLanguage);
    },

    methods: {
        setLanguage(_langCode) {
            let langCode = _langCode || this.language || getLanguageCode();
            let lang = this.findLanguageByCode(langCode);

            if (!lang) {
                langCode = appConfig.settings.defaultLanguage;
                lang = this.findLanguageByCode(langCode);
            }

            if (lang) {
                if (lang.rtl) {
                    document.documentElement.dir = 'rtl';
                } else {
                    document.documentElement.dir = '';
                }
            }

            if (langCode !== this.language) {
                defer(() => {
                    window.location.reload();
                });
            }

            this.$store.commit(`app/${SET_LANGUAGE}`, langCode);
            translations.setLocale(langCode);

            loadLanguage(langCode);
        },

        findLanguageByCode(_langCode) {
            return this._languages.find(_lang => _lang.value === _langCode);
        },
    },
};
</script>
