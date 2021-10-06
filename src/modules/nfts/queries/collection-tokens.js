import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql-query.js';

export async function getCollectionTokens(address = '', pagination = {}) {
    const query = {
        query: gql`
            query CollectionTokens($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                collection(address: $address) {
                    tokens(first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            cursor
                            node {
                                address
                                tokenId
                                name
                                description
                                image
                                imageProxy
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

    const data = await gqlQuery(query, 'collection');

    return data ? data.tokens : null;
}
