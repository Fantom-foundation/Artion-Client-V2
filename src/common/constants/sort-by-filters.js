export function SORT_BY_FILTERS() {
    return [
        {
            value: '',
            label: 'Sort by',
            disabled: true,
        },
        {
            value: 'createdAt',
            label: 'sort_by.recently_created',
            queryFilter: {
                sortBy: 'CREATED',
                sortDir: 'DESC',
            },
        },
        {
            value: 'oldest',
            label: 'sort_by.oldest',
            queryFilter: {
                sortBy: 'CREATED',
                sortDir: 'ASC',
            },
        },
        {
            value: 'listedAt',
            label: 'sort_by.recently_listed',
            queryFilter: {
                sortBy: 'LAST_LISTING',
                sortDir: 'DESC',
            },
        },
        {
            value: 'soldAt',
            label: 'sort_by.recently_sold',
            queryFilter: {
                sortBy: 'LAST_TRADE',
                sortDir: 'DESC',
            },
        },
        {
            value: 'saleEndsAt',
            label: 'sort_by.ending_soon',
            queryFilter: {
                sortBy: 'AUCTION_UNTIL',
                sortDir: 'ASC',
                filter: {
                    hasAuction: true,
                },
            },
        },
        {
            value: 'price',
            label: 'sort_by.highest_price',
            queryFilter: {
                sortBy: 'PRICE',
                sortDir: 'DESC',
            },
        },
        {
            value: 'cheapest',
            label: 'sort_by.lowest_price',
            queryFilter: {
                sortBy: 'PRICE',
                sortDir: 'ASC',
            },
        },
        {
            value: 'lastSalePrice',
            label: 'sort_by.highest_last_sale',
            queryFilter: {
                sortBy: 'LAST_TRADE_AMOUNT',
                sortDir: 'DESC',
            },
        },
        {
            value: 'viewed',
            label: 'sort_by.mostly_viewed',
            disabled: true,
        },
    ];
}
