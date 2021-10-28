import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getToken(contract = '', id = '') {
    const query = {
        query: gql`
            query GetToken($contract: Address!, $tokenId: BigInt!) {
                token(contract: $contract, tokenId: $tokenId) {
                    contract
                    tokenId
                    name
                    description
                    image
                    imageThumb
                    created
                    hasListing
                    hasOffer
                    hasAuction
                    hasBids
                    lastListing
                    lastTrade
                    lastOffer
                    lastBid
                    likes
                    views
                }
            }
        `,
        variables: {
            contract,
            tokenId: id,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token');
}

export async function getTokenWithOwnerships(contract = '', id = '') {
    const query = {
        query: gql`
            query GetTokenWithOwnerships($contract: Address!, $tokenId: BigInt!) {
                token(contract: $contract, tokenId: $tokenId) {
                    contract
                    tokenId
                    name
                    description
                    image
                    imageThumb
                    ownerships(first: 20) {
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
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token');
}
