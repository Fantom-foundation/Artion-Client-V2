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
            disabled: true,
        },
        {
            value: 'price',
            label: 'sort_by.most_expensive',
            disabled: true,
        },
        {
            value: 'cheapest',
            label: 'sort_by.cheapest',
            disabled: true,
        },
        {
            value: 'lastSalePrice',
            label: 'sort_by.highest_last_sale',
            disabled: true,
        },
        {
            value: 'viewed',
            label: 'sort_by.mostly_viewed',
            disabled: true,
        },
    ];
}
