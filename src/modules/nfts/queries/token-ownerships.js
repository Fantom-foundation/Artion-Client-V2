import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getTokenOwnerships(contract = '', id = '', pagination = {}) {
    const query = {
        query: gql`
            query GetTokenOwnerships(
                $contract: Address!
                $tokenId: BigInt!
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                token(contract: $contract, tokenId: $tokenId) {
                    ownerships(first: $first, after: $after, last: $last, before: $before) {
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
                                owner
                                ownerUser {
                                    address
                                    username
                                    avatarThumb
                                }
                                qty
                                updated
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            contract,
            tokenId: id,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token.ownerships');
}
