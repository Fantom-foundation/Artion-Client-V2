import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserOwnershipTokens(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserOwnershipTokens($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    ownerships(first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            node {
                                contract
                                tokenId
                                token {
                                    contract
                                    tokenId
                                    name
                                    description
                                    image
                                    imageThumb
                                    likes
                                }
                            }
                        }
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

    return gqlQuery(query, 'user.ownerships');
}
