import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserOwnershipTokens(address = '', pagination = {}, collection = null) {
    const query = {
        query: gql`
            query GetUserOwnershipTokens(
                $collection: Address
                $address: Address!
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                user(address: $address) {
                    ownerships(collection: $collection, first: $first, after: $after, last: $last, before: $before) {
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
                                    hasBids
                                    collection {
                                        contract
                                        name
                                    }
                                    listingPrice {
                                        amount
                                        payToken
                                    }
                                    auctionedPrice {
                                        amount
                                        payToken
                                    }
                                    auctionReservePrice {
                                        amount
                                        payToken
                                    }
                                    offeredPrice {
                                        amount
                                        payToken
                                    }
                                    lastTradePrice {
                                        amount
                                        payToken
                                    }
                                    auction {
                                        endTime
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            address,
            collection,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'user.ownerships');
}

export async function getUserOwnershipTokensCount(address = '', pagination = {}, collection = null) {
    const query = {
        query: gql`
            query GetUserOwnershipTokens(
                $collection: Address
                $address: Address!
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                user(address: $address) {
                    ownerships(collection: $collection, first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                    }
                }
            }
        `,
        variables: {
            address,
            collection,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'user.ownerships');
}
