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
            search,
            mintableBy,
            ...pagination,
        },
        // fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'collections');
}

export async function getBannedCollections(pagination = { first: 5000 }, search = null) {
    const query = {
        query: gql`
            query GetBannedCollections($search: String, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                bannedCollections(search: $search, first: $first, after: $after, last: $last, before: $before) {
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
            search,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'bannedCollections');
}

export async function getCollectionsInReview(pagination = { first: 5000 }, search = null) {
    const query = {
        query: gql`
            query GetCollectionsInReview($search: String, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                collectionsInReview(search: $search, first: $first, after: $after, last: $last, before: $before) {
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
            search,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'collectionsInReview');
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
