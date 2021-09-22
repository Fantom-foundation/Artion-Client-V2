import Vue from 'vue';
import VueI18n from 'vue-i18n';
import appConfig from '@/app.config.js';

// Vue.use(VueI18n);

function loadLocaleMessages() {
    const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

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

export function setupI18n(vueInstance = Vue) {
    vueInstance.use(VueI18n);

    return new VueI18n({
        locale: process.env.VUE_APP_I18N_LOCALE || 'en',
        fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
        messages: loadLocaleMessages(),
        dateTimeFormats,
    });
}

/*
export default new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages(),
    dateTimeFormats,
});
*/
