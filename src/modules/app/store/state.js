/**
 * Application state object
 * @typedef {Object} AppState
 * @property {string} language Code of current language
 * @property {('default'|'dark')} theme Theme used in application
 */

/** @type {AppState} */
export const state = {
    language: '',
    documentTitle: '',
    theme: 'default',
};

export const storeInLocalStorage = ['language', 'theme'];
