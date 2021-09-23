/**
 * Wallet object
 * @typedef {Object} Wallet
 * @property {string} code Unique code wallet
 * @property {string} label
 * @property {string} icon Name of the icon from AppIconset
 */

/**
 * @type {Wallet[]}
 */
export const WALLETS = [
    {
        icon: 'metamask',
        code: 'metamask',
        label: 'Metamask',
    },
    {
        icon: 'coinbase',
        code: 'coinbase',
        label: 'Coinbase Wallet',
    },
];
