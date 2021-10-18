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
                            imageThumb
                            likes
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
