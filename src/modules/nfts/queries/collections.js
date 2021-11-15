import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getCollections(pagination = { first: 5000 }, search = null, mintableBy = null) {
    const query = {
        query: gql`
            query GetCollections(
                $search: String
                $mintableBy: Address
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                collections(
                    search: $search
                    mintableBy: $mintableBy
                    first: $first
                    after: $after
                    last: $last
                    before: $before
                ) {
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
            search,
            mintableBy,
        },
        // fetchPolicy: 'network-only',
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
