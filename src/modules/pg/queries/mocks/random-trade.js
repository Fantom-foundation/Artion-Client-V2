import { bToWei, toHex } from '@/utils/big-number.js';

export async function getRandomTrade() {
    return {
        name: 'Random Trade Name',
        tradeStarts: '2021-10-22T16:00:00+02:00',
        tradeEnds: '2021-10-23T16:00:00+02:00',
        tokensAvailable: '0x0',
        totalTokens: '0x12f939c99edab80000', // 350
        payTokens: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'],
    };
}

export async function getRandomTradeTokensAmount() {
    console.log(toHex(bToWei(3283)));

    return {
        tokensAvailable: '0xde0b6b3a7640000', // 1
        totalTokens: '0x12f939c99edab80000', // 350
    };
}

export async function getRandomTradePayTokenPrice() {
    return {
        price: '0x1043561a8829300000', // 300
    };
}
