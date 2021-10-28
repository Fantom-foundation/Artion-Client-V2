import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

/**
 * @param {string} contract
 * @param {string} tokenId
 */
export async function incrementTokenViews(contract, tokenId) {
    const mutation = {
        mutation: gql`
            mutation IncrementTokenViews($contract: Address!, $tokenId: BigInt!) {
                incrementTokenViews(contract: $contract, tokenId: $tokenId)
            }
        `,
        variables: { contract, tokenId },
    };

    return gqlMutation(mutation, 'incrementTokenViews');
}
