import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql-query.js';

export async function getToken(address = '', id = 0) {
    const query = {
        query: gql`
            query CollectionTokens($address: Address!, $tokenId: BigInt!) {
                token(address: $address, tokenId: $tokenId) {
                    address
                    tokenId
                    name
                    description
                    image
                }
            }
        `,
        variables: {
            address,
            tokenId: id,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token');
}
