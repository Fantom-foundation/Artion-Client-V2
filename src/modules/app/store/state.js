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
 * @property {number} nftsDensity Density of nfts in nft list
 */

/** @type {AppState} */
export const state = {
    language: '',
    theme: 'theme-default',
    txStatus: {},
    nftsDensity: 280,
    autoDarkTheme: false,
};

export const storeInLocalStorage = ['language', 'theme', 'nftsDensity', 'autoDarkTheme'];
