import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getTokens(pagination = {}, filterSort = {}) {
    const query = {
        query: gql`
            query GetTokens(
                $filter: TokenFilter
                $sortBy: TokenSorting
                $sortDir: SortingDirection
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                tokens(
                    filter: $filter
                    sortBy: $sortBy
                    sortDir: $sortDir
                    first: $first
                    after: $after
                    last: $last
                    before: $before
                ) {
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
        `,
        variables: {
            ...pagination,
            ...filterSort,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'tokens');
}

export async function getTokensCount(pagination = {}, filterSort = {}) {
    const query = {
        query: gql`
            query GetTokensCount($filter: TokenFilter, $sortBy: TokenSorting, $sortDir: SortingDirection) {
                tokens(filter: $filter, sortBy: $sortBy, sortDir: $sortDir, first: 0) {
                    totalCount
                }
            }
        `,
        variables: {
            ...pagination,
            ...filterSort,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'tokens');
}
