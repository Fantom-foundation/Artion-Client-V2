import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserTokenCounters(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserTokenCounters($address: Address!) {
                user(address: $address) {
                    ownerships {
                        totalCount
                    }
                    tokenLikes {
                        totalCount
                    }
                    createdTokens {
                        totalCount
                    }
                }
            }
        `,
        variables: {
            address,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return await gqlQuery(query, 'user');
}
