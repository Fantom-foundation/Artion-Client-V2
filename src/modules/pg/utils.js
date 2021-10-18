import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';

export async function getWFTMToken() {
    const payTokens = await PAY_TOKENS_WITH_PRICES();

    return payTokens.find(token => token.address === '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83');
}
