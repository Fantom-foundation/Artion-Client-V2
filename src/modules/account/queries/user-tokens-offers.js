import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserOffers(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserOffers($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    offers(first: $first, after: $after, last: $last, before: $before) {
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
                                token {
                                    contract
                                    imageThumb
                                    name
                                }
                                proposedBy
                                proposedByUser {
                                    address
                                    username
                                    avatarThumb
                                }
                                quantity
                                payToken
                                unitPrice
                                created
                                deadline
                                closed
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

    return gqlQuery(query, 'user.offers');
}

export async function getUserMyOffers(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserMyOffers($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    myOffers(first: $first, after: $after, last: $last, before: $before) {
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
                                token {
                                    contract
                                    imageThumb
                                    name
                                }
                                quantity
                                payToken
                                unitPrice
                                created
                                deadline
                                closed
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

    return gqlQuery(query, 'user.myOffers');
}

export async function getUserOffersCount(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserOffersCount($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    offers(first: $first, after: $after, last: $last, before: $before) {
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

    return gqlQuery(query, 'user.offers');
}

export async function getUserMyOffersCount(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserMyOffersCount($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    myOffers(first: $first, after: $after, last: $last, before: $before) {
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

    return gqlQuery(query, 'user.myOffers');
}
