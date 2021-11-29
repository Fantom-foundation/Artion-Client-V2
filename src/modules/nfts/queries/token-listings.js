import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

export async function getTokenListings(contract = '', id = '', pagination = {}) {
    const query = {
        query: gql`
            query GetTokenListings(
                $contract: Address!
                $tokenId: BigInt!
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                token(contract: $contract, tokenId: $tokenId) {
                    listings(first: $first, after: $after, last: $last, before: $before) {
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
                                marketplace
                                owner
                                ownerUser {
                                    address
                                    username
                                    avatarThumb
                                }
                                quantity
                                payToken
                                unitPrice
                                startTime
                                closed
                                isActive
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
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token.listings');
}
