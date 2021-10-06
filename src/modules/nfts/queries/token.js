import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql-query.js';

export async function getToken(contract = '', id = '') {
    const query = {
        query: gql`
            query CollectionTokens($contract: Address!, $tokenId: BigInt!) {
                token(contract: $contract, tokenId: $tokenId) {
                    contract
                    tokenId
                    name
                    description
                    image
                }
            }
        `,
        variables: {
            contract,
            tokenId: id,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token');
}
