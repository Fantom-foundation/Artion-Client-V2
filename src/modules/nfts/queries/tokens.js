import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql-query.js';

export async function getTokens(pagination = {}) {
    const query = {
        query: gql`
            query GetTokens($first: Int, $after: Cursor, $last: Int, $before: Cursor) {
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
                            contract
                            tokenId
                            name
                            description
                            image
                            imageProxy
                        }
                    }
                }
            }
        `,
        variables: {
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'tokens');
}
