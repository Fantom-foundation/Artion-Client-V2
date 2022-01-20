import { i18n } from '@/plugins/vue-i18n.js';
import { ACTIVITY_TYPES } from '@/common/constants/activity-type-filters.js';

const ACTIVITY_FILTERS = ACTIVITY_TYPES().map(activity => activity.filter);

function getFiltersByPattern(pattern) {
    return ACTIVITY_FILTERS.filter(activity => pattern.test(activity));
}

export function ITEM_ACTIVITY_FILTER_OPTIONS() {
    return [
        {
            label: i18n.t('nftitemactivityfilter.sales'),
            value: 'sales',
            filters: getFiltersByPattern(/SOLD|RESOLVED/),
        },
        {
            label: i18n.t('nftitemactivityfilter.transfers'),
            value: 'transfers',
            filters: getFiltersByPattern(/TRANSFER|MINT|BURN/),
        },
        {
            label: i18n.t('nftitemactivityfilter.listings'),
            value: 'listings',
            filters: getFiltersByPattern(/LISTING/),
        },
        {
            label: i18n.t('nftitemactivityfilter.offers'),
            value: 'offers',
            filters: getFiltersByPattern(/OFFER/),
        },
        {
            label: i18n.t('nftitemactivityfilter.auctions'),
            value: 'auctions',
            filters: getFiltersByPattern(/AUCTION/),
        },
    ];
}
