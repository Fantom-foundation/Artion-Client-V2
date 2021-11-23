import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

export async function getTokenOffers(contract = '', id = '', pagination = {}) {
    const query = {
        query: gql`
            query GetTokenOffers(
                $contract: Address!
                $tokenId: BigInt!
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                token(contract: $contract, tokenId: $tokenId) {
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
            contract,
            tokenId: toHex(id),
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token.offers');
}
