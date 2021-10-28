import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

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
                                owner
                                quantity
                                payToken
                                unitPrice
                                startTime
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

    return gqlQuery(query, 'token.listings');
}
