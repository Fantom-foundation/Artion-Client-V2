import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

/**
 * @param {string} contract
 * @param {string} tokenId
 */
export async function banToken({ contract = '', tokenId = '' }) {
    const mutation = {
        mutation: gql`
            mutation BanToken($contract: Address!, $tokenId: BigInt!) {
                banToken(contract: $contract, tokenId: $tokenId)
            }
        `,
        variables: { contract, tokenId: toHex(tokenId) },
    };

    return gqlMutation(mutation, 'banToken');
}

/**
 * @param {string} contract
 * @param {string} tokenId
 */
export async function unbanToken({ contract = '', tokenId = '' }) {
    const mutation = {
        mutation: gql`
            mutation UnbanToken($contract: Address!, $tokenId: BigInt!) {
                unbanToken(contract: $contract, tokenId: $tokenId)
            }
        `,
        variables: { contract, tokenId: toHex(tokenId) },
    };

    return gqlMutation(mutation, 'banToken');
}
