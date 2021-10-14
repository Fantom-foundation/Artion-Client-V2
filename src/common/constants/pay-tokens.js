/**
 * PayToken object
 * @typedef {Object} PayToken
 * @property {string} address
 * @property {string} label
 * @property {string} img
 * @property {number} price
 * @property {string} value Code
 */

/**
 * @return {PayToken[]}
 */
export function PAY_TOKENS() {
    return [
        {
            address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
            label: 'WFTM',
            img: '/img/WFTM.png',
            price: 0,
            value: 'wftm',
        },
        {
            address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
            label: 'DAI',
            img: '',
            price: 1,
            value: 'day',
        },
        {
            address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
            label: 'USDC',
            img: '',
            price: 1,
            value: 'usdc',
        },
    ];
}
