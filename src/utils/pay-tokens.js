import { PAY_TOKENS, PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
import { compareAddresses } from '@/utils/address.js';

const _PAY_TOKENS = PAY_TOKENS();

/**
 * @param {string} address
 * @param {PayToken[]} [payTokens]
 * @return {Promise<{img: string, address: string, price: number, _update: boolean, label: string, value: string}|null>}
 */
export async function getPayToken(address, payTokens = _PAY_TOKENS) {
    /** @type {PayToken} */
    const payToken = payTokens.find(token => compareAddresses(token.address, address));

    return payToken ? { ...payToken } : null;
}

/**
 * @param {string} address
 * @return {Promise<{img: string, address: string, price: number, _update: boolean, label: string, value: string}|null>}
 */
export async function getPayTokenWithPrice(address) {
    /** @type {PayToken[]} */
    const payTokens = await PAY_TOKENS_WITH_PRICES();

    return getPayToken(address, payTokens);
}
