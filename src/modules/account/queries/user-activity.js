import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserActivity(address = '', pagination = {}, filterSort = {}) {
    const query = {
        query: gql`
            query GetUserActivity(
                $address: Address!
                $filter: ActivityFilter
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                user(address: $address) {
                    activities(filter: $filter, first: $first, after: $after, last: $last, before: $before) {
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
                                time
                                type
                                contract
                                quantity
                                from
                                to
                                payToken
                                tokenId
                                unitPrice
                                token {
                                    contract
                                    imageThumb
                                    name
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
            ...filterSort,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'user.activities');
}
