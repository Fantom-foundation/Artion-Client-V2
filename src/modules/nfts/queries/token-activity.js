import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

export async function getTokenActivity(contract = '', id = '', pagination = {}, filterSort = {}) {
    const query = {
        query: gql`
            query GetTokenActivity(
                $contract: Address!
                $tokenId: BigInt!
                $filter: ActivityFilter
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                token(contract: $contract, tokenId: $tokenId) {
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
                                fromUser {
                                    address
                                    username
                                    avatarThumb
                                }
                                to
                                toUser {
                                    address
                                    username
                                    avatarThumb
                                }
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
            contract,
            tokenId: toHex(id),
            ...pagination,
            ...filterSort,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token.activities');
}
