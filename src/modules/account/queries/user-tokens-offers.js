import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserOffers(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserOffers($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    createdTokens(first: $first, after: $after, last: $last, before: $before) {
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
                                hasOffer
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
                                            token {
                                                contract
                                                imageThumb
                                                name
                                            }
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
                    }
                }
            }
        `,
        variables: {
            address,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'user.createdTokens');
}
