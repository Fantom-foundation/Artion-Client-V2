import { getDefiTokens } from '@/modules/wallet/queries/defi-tokens.js';
import { bFromTokenValue } from '@/utils/big-number.js';

/**
 * PayToken object
 * @typedef {Object} PayToken
 * @property {string} address
 * @property {string} label
 * @property {string} img
 * @property {number} price
 * @property {string} value Code
 * @property {boolean} _update Update price
 */

/**
 * @return {PayToken[]}
 */
export function PAY_TOKENS() {
    return [
        {
            address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
            label: 'wFTM',
            img: 'img/WFTM.png',
            price: 1,
            priceDecimals: 18,
            decimals: 18,
            value: 'wftm',
            _update: true,
        },
        {
            address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
            label: 'DAI',
            img: '',
            price: 1,
            priceDecimals: 18,
            decimals: 18,
            value: 'day',
        },
        {
            address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
            label: 'USDC',
            img: '',
            price: 1,
            priceDecimals: 18,
            decimals: 18,
            value: 'usdc',
        },
    ];
}

/**
 * Returns list of pay tokens with updated prices. Updates price on the token with attribut `_update: true`.
 *
 * @return {PayToken[]}
 */
export async function PAY_TOKENS_WITH_PRICES() {
    const payTokens = PAY_TOKENS();
    const defiTokens = await getDefiTokens();

    payTokens.forEach(token => {
        let dToken = null;

        if (token._update) {
            dToken = defiTokens.find(token => token.address.toLowerCase() === token.address.toLowerCase());
            if (dToken) {
                token.price = bFromTokenValue(dToken.price, dToken.priceDecimals).toNumber();
                token.priceDecimals = dToken.priceDecimals;
                token.decimals = dToken.decimals;
            }
        }
    });

    return payTokens;
}
