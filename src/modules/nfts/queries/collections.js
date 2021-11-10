import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getCollections(pagination = { first: 5000 }) {
    const query = {
        query: gql`
            query GetCollections($search: String, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                collections(search: $search, first: $first, after: $after, last: $last, before: $before) {
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
                            name
                            image
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

    return gqlQuery(query, 'collections');
}

/*
export async function getCollections() {
    const query = {
        query: gql`
            query GetCollections {
                collections(first: 5000) {
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
                            name
                            image
                        }
                    }
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'collections');
}
*/
