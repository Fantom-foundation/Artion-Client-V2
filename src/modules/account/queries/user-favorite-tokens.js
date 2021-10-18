import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserFavoriteTokens(address = '', pagination = {}) {
    const query = {
        query: gql`
            query getUserFavoriteTokens($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    tokenLikes(first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            node {
                                tokenId
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

    return gqlQuery(query, 'user.tokenLikes');
}
