import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

/**
 * @param {string} contract
 * @param {string} tokenId
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function getAuction(contract = '', tokenId = '') {
    const query = {
        query: gql`
            query GetAuction($contract: Address!, $tokenId: BigInt!) {
                token(contract: $contract, tokenId: $tokenId) {
                    auction {
                        contract
                        tokenId
                        owner
                        auctionHall
                        quantity
                        payToken
                        reservePrice
                        reservePriceExceeded
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
                        isActive
                        withdrawSince
                        props {
                            winnerCanResult
                            sellerCanResultUnderpriced
                            canCancelSuccessful
                            hasResultFailed
                        }
                    }
                }
            }
        `,
        variables: {
            contract,
            tokenId: toHex(tokenId),
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token.auction');
}

/**
 * Auction object.
 * @typedef {Object} Auction
 * @property {string} contract
 * @property {string} tokenId
 * @property {string} owner
 * @property {string} auctionHall
 * @property {string} quantity
 * @property {string} payToken
 * @property {string} reservePrice
 * @property {boolean} reservePriceExceeded
 * @property {string} minBidAmount
 * @property {string} created
 * @property {string} startTime
 * @property {string} endTime
 * @property {string} closed
 * @property {string} lastBid
 * @property {string} lastBidPlaced
 * @property {string} lastBidder
 * @property {string} winner
 * @property {string} resolved
 * @property {boolean} isActive
 * @property {string} withdrawSince
 * @property {AuctionProps} props
 */

/**
 * Auction props object.
 * @typedef {Object} AuctionProps
 * @property {boolean} winnerCanResult
 * @property {boolean} sellerCanResultUnderpriced
 * @property {boolean} canCancelSuccessful
 * @property {boolean} hasResultFailed
 */
