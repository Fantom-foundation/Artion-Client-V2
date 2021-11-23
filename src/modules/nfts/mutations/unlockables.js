import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

/**
 * @param {string} contract
 * @param {string} tokenId
 * @param {string} content
 */
export async function setUnlockableContent(contract, tokenId, content) {
    const mutation = {
        mutation: gql`
            mutation SetUnlockableContent($contract: Address!, $tokenId: BigInt!, $content: String!) {
                setUnlockableContent(contract: $contract, tokenId: $tokenId, content: $content)
            }
        `,
        variables: { contract, tokenId: toHex(tokenId), content },
    };

    return gqlMutation(mutation, 'setUnlockableContent');
}
