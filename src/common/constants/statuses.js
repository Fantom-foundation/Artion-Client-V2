/**
 * Status object
 * @typedef {Object} Status
 * @property {string} id
 * @property {string} label Translation code
 * @property {string} queryFilter Name of the filter used in queries
 */

/**
 * @return {Status[]}
 */
export function STATUSES() {
    return [
        {
            id: 'buy_now',
            label: 'statuses.buy_now',
            queryFilter: 'hasListing',
        },
        {
            id: 'has_bids',
            label: 'statuses.has_bids',
            queryFilter: 'hasBids',
        },
        {
            id: 'has_offers',
            label: 'statuses.has_offers',
            queryFilter: 'hasOffer',
        },
        {
            id: 'on_auction',
            label: 'statuses.on_auction',
            queryFilter: 'hasAuction',
        },
    ];
}
