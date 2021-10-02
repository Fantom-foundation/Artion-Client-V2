export function SORT_BY_FILTERS() {
    return [
        {
            value: 'createdAt',
            label: 'sort_by.recently_created',
        },
        {
            value: 'oldest',
            label: 'sort_by.oldest',
        },
        {
            value: 'listedAt',
            label: 'sort_by.recently_listed',
        },
        {
            value: 'soldAt',
            label: 'sort_by.recently_sold',
        },
        {
            value: 'saleEndsAt',
            label: 'sort_by.ending_soon',
        },
        {
            value: 'price',
            label: 'sort_by.most_expensive',
        },
        {
            value: 'cheapest',
            label: 'sort_by.cheapest',
        },
        {
            value: 'lastSalePrice',
            label: 'sort_by.highest_last_sale',
        },
        {
            value: 'viewed',
            label: 'sort_by.mostly_viewed',
        },
    ];
}
