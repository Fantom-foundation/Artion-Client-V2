/**
 * Status object
 * @typedef {Object} Status
 * @property {string} id
 * @property {string} label Translation code
 */

/**
 * @return {Status[]}
 */
export function STATUSES() {
    return [
        {
            id: 'buy_now',
            label: 'statuses.buy_now',
        },
        {
            id: 'has_bids',
            label: 'statuses.has_bids',
        },
        {
            id: 'has_offers',
            label: 'statuses.has_offers',
        },
        {
            id: 'on_auction',
            label: 'statuses.on_auction',
        },
    ];
}
