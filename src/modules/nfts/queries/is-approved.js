import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function isApprovedForAll(contract, owner, operator) {
    const query = {
        query: gql`
            query IsApprovedForAll($contract: Address!, $owner: Address!, $operator: Address!) {
                isApprovedForAll(contract: $contract, owner: $owner, operator: $operator)
            }
        `,
        variables: {
            contract,
            owner,
            operator,
        },
        fetchPolicy: 'network-only',
    };
    return await gqlQuery(query, 'isApprovedForAll');
}
