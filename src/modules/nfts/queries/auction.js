import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getAuction(contract = '', tokenId = '') {
    const query = {
        query: gql`
            query GetAuction($contract: Address!, $tokenId: BigInt!) {
                token(contract: $contract, tokenId: $tokenId) {
                    auction {
                        contract
                        tokenId
                        owner
                        quantity
                        payToken
                        reservePrice
                        minBidAmount
                        created
                        startTime
                        endTime
                        closed
                        lastBid
                        lastBidPlaced
                        lastBidder
                        winner
                        resolved
                    }
                }
            }
        `,
        variables: {
            contract,
            tokenId,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token.auction');
}
