import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

/**
 * @param {string} contract
 * @param {string} tokenId
 */
export async function likeToken({ contract = '', tokenId = '' }) {
    const mutation = {
        mutation: gql`
            mutation LikeToken($contract: Address!, $tokenId: BigInt!) {
                likeToken(contract: $contract, tokenId: $tokenId)
            }
        `,
        variables: { contract, tokenId },
    };

    return gqlMutation(mutation, 'likeToken');
}

/**
 * @param {string} contract
 * @param {string} tokenId
 */
export async function unlikeToken({ contract = '', tokenId = '' }) {
    const mutation = {
        mutation: gql`
            mutation UnlikeToken($contract: Address!, $tokenId: BigInt!) {
                unlikeToken(contract: $contract, tokenId: $tokenId)
            }
        `,
        variables: { contract, tokenId },
    };

    return gqlMutation(mutation, 'likeToken');
}
