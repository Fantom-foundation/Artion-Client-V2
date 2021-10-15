/**
 * Transaction status object
 * @typedef {Object} TxStatus
 * @property {('pending'|'success'|'error')} status
 * @property {*} [data]
 * @property {string} [code]
 */

/**
 * Application state object
 * @typedef {Object} AppState
 * @property {string} language Code of current language
 * @property {('default'|'dark')} theme Theme used in application
 * @property {TxStatus} txStatus Status of a transaction
 */

/** @type {AppState} */
export const state = {
    language: '',
    nftsDensity: 280,
    theme: 'default',
    txStatus: {},
};

export const storeInLocalStorage = ['language', 'theme'];
