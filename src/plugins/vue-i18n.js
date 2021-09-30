import Vue from 'vue';
import VueI18n from 'vue-i18n';
import appConfig from '@/app.config.js';

const defaultLocale = process.env.VUE_APP_I18N_LOCALE || 'en';

Vue.use(VueI18n);

const includedLanguage = require(`../locales/${defaultLocale}.json`);

document.documentElement.setAttribute('lang', defaultLocale);

const defaultDatetimeFormat = {
    short: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    },
    shortDatetime: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    },
    long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
    },
};

const dateTimeFormats = {};

appConfig.settings.languages.forEach(lang => {
    if (!(lang.value in dateTimeFormats)) {
        dateTimeFormats[lang.value] = defaultDatetimeFormat;
    }
});

const messages = {
    en: () => import(/* webpackChunkName: 'en' */ '../locales/en.json'),
};

export const i18n = new VueI18n({
    locale: defaultLocale,
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: {
        en: includedLanguage,
    },
    dateTimeFormats,
});

export function loadLanguage(language) {
    return messages[language]().then(i18nMessages => {
        i18n.setLocaleMessage(language, i18nMessages);
        i18n.locale = language;
        document.documentElement.setAttribute('lang', language);
    });
}
