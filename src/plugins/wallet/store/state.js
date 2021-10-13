/**
 * Wallet state object
 * @typedef {Object} WalletState
 * @property {string} chainId Currently selected account
 * @property {string} account Code of current language
 * @property {('metamask'|'coinbase')} wallet Currently selected wallet
 * @property {string} bt Bearer tokens
 */

/** @type {WalletState} */
export const state = {
    chainId: 0,
    account: '',
    wallet: '',
    bt: {},
};

export const storeInLocalStorage = ['chainId', 'account', 'wallet', 'bt'];
