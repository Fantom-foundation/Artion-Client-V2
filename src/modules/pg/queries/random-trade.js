import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

/**
 * @param {string} contract Contract address
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function getRandomTrade(contract = '') {
    const query = {
        query: gql`
            query GetRandomTrade($contract: Address!) {
                randomTrade(contract: $contract) {
                    name
                    tradeStarts
                    tradeEnds
                    tokensAvailable
                    totalTokens
                    payTokens
                }
            }
        `,
        variables: {
            contract,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'randomTrade');
}

/**
 * @param {string} contract Contract address
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function getRandomTradeTokensAmount(contract = '') {
    const query = {
        query: gql`
            query GetRandomTradeTokensAmount($contract: Address!) {
                randomTrade(contract: $contract) {
                    tokensAvailable
                    totalTokens
                }
            }
        `,
        variables: {
            contract,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'randomTrade');
}

/**
 * @param {string} contract Contract address
 * @param {string} token Pay token address
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function getRandomTradePayTokenPrice(contract = '', token = '') {
    const query = {
        query: gql`
            query GetRandomTradePayTokenPrice($contract: Address!, $token: Address!) {
                randomTrade(contract: $contract) {
                    price(token: $token)
                }
            }
        `,
        variables: {
            contract,
            token,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'randomTrade.price');
}
