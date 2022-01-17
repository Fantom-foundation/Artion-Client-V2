import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getBannedTokens(pagination = {}) {
    const query = {
        query: gql`
            query GetBannedTokens($first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                bannedTokens(first: $first, after: $after, last: $last, before: $before) {
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
                                tokenId
                                name
                                description
                                image
                                imageThumb
                                likes
                                isLiked
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
        `,
        variables: {
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'bannedTokens');
}

export async function getBannedTokensCount(pagination = {}) {
    const query = {
        query: gql`
            query GetBannedTokensCount($first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                bannedTokens(first: 0) {
                    totalCount
                }
            }
        `,
        variables: {
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'bannedTokens');
}
