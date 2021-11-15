import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserFavoriteTokens(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserFavoriteTokens($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
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
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'user.tokenLikes');
}

export async function getUserFavoriteTokensCount(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserFavoriteTokensCount(
                $address: Address!
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                user(address: $address) {
                    tokenLikes(first: $first, after: $after, last: $last, before: $before) {
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

    return gqlQuery(query, 'user.tokenLikes');
}
