import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

export async function tokenExists(contract = '', id = '') {
    const query = {
        query: gql`
            query GetToken($contract: Address!, $tokenId: BigInt!) {
                token(contract: $contract, tokenId: $tokenId) {
                    contract
                    tokenId
                    name
                }
            }
        `,
        variables: {
            contract,
            tokenId: toHex(id),
        },
        fetchPolicy: 'network-only',
    };
    const token = await gqlQuery(query, 'token');
    return token && token.name;
}

export async function getToken(contract = '', id = '') {
    const query = {
        query: gql`
            query GetToken($contract: Address!, $tokenId: BigInt!) {
                token(contract: $contract, tokenId: $tokenId) {
                    contract
                    tokenId
                    name
                    description
                    symbol
                    ipRights
                    image
                    imageThumb
                    imageMimetype
                    created
                    royalty
                    feeRecipient
                    feeRecipientUser {
                        address
                        username
                        avatarThumb
                    }
                    hasListing
                    hasOffer
                    hasAuction
                    hasBids
                    lastListing
                    lastTrade
                    lastOffer
                    lastBid
                    likes
                    isLiked
                    views
                    collection {
                        contract
                        name
                        description
                        email
                        site
                        discord
                        telegram
                        twitter
                        medium
                        instagram
                    }
                }
            }
        `,
        variables: {
            contract,
            tokenId: toHex(id),
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
            tokenId: toHex(id),
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token');
}
