import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

export async function getUnlockable(contract = '', id = '') {
    const query = {
        query: gql`
            query GetUnlockable($contract: Address!, $tokenId: BigInt!) {
                unlockableContent(contract: $contract, tokenId: $tokenId)
            }
        `,
        variables: {
            contract,
            tokenId: toHex(id),
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'unlockableContent');
}
