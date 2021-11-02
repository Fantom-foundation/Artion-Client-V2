export function ACTIVITY_TYPES() {
    return [
        {
            label: 'Filter by',
            filter: '',
            disabled: true,
        },
        {
            label: '---',
            filter: '',
        },
        {
            label: 'activity_types.listing_created',
            filter: 'LISTING_CREATED',
        },
        {
            label: 'activity_types.listing_updated',
            filter: 'LISTING_UPDATED',
        },
        {
            label: 'activity_types.listing_cancelled',
            filter: 'LISTING_CANCELLED',
        },
        {
            label: 'activity_types.listing_sold',
            filter: 'LISTING_SOLD',
        },
        {
            label: 'activity_types.offer_created',
            filter: 'OFFER_CREATED',
        },
        {
            label: 'activity_types.offer_cancelled',
            filter: 'OFFER_CANCELLED',
        },
        {
            label: 'activity_types.offer_sold',
            filter: 'OFFER_SOLD',
        },
        {
            label: 'activity_types.auction_created',
            filter: 'AUCTION_CREATED',
        },
        {
            label: 'activity_types.auction_bid',
            filter: 'AUCTION_BID',
        },
        {
            label: 'activity_types.auction_bid_withdraw',
            filter: 'AUCTION_BID_WITHDRAW',
        },
        {
            label: 'activity_types.auction_cancelled',
            filter: 'AUCTION_CANCELLED',
        },
        {
            label: 'activity_types.auction_resolved',
            filter: 'AUCTION_RESOLVED',
        },
        {
            label: 'activity_types.auction_updated',
            filter: 'AUCTION_UPDATED',
        },
    ];
}
