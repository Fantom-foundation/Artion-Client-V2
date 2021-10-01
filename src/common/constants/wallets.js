/**
 * Wallet object
 * @typedef {Object} Wallet
 * @property {string} id
 * @property {string} label
 * @property {string} icon Name of the icon from AppIconset
 */

/**
 * @type {Wallet[]}
 */
export function WALLETS() {
    return [
        {
            id: 'metamask',
            label: 'Metamask',
            icon: 'metamask',
        },
        {
            id: 'coinbase',
            label: 'Coinbase Wallet',
            icon: 'coinbase',
        },
    ];
}
