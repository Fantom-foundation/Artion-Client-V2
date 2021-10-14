import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

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
            tokenId: id,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token.offers');
}
