/**
 * Functions related to nft filters
 */

import { isArray } from 'fantom-vue-components/src/utils';
import { STATUSES } from '@/common/constants/statuses.js';
import { SORT_BY_FILTERS } from '@/common/constants/sort-by-filters.js';

const statuses = {};
const sortByFilters = {};

STATUSES().forEach(status => {
    statuses[status.id] = status.queryFilter;
});

SORT_BY_FILTERS().forEach(filter => {
    sortByFilters[filter.value] = filter.queryFilter;
});

export function flattenFilters(filters) {
    const fFilters = [];

    Object.keys(filters).forEach(filterName => {
        const filter = filters[filterName];

        if (isArray(filter)) {
            filter.forEach(code => {
                fFilters.push({
                    value: code,
                    filterName,
                });
            });
        } else {
            fFilters.push({
                value: filter,
                filterName,
            });
        }
    });

    return fFilters;
}

export function filtersToQueryFilters(filters, defaultFilters) {
    const qFilters = {
        filter: {},
    };
    const strQFilters = JSON.stringify(qFilters);
    const fFilters = flattenFilters(filters);

    fFilters.forEach(filter => {
        const { filterName } = filter;

        if (filterName === 'status') {
            const status = statuses[filter.value];

            if (status) {
                qFilters.filter[status] = true;
            }
        } else if (filterName === 'collections') {
            if (qFilters.filter['collections']) {
                if (isArray(qFilters.filter['collections'])) {
                    qFilters.filter['collections'].push(filter.value);
                } else {
                    qFilters.filter['collections'] = [qFilters.filter['collections'], filter.value];
                }
            } else {
                qFilters.filter['collections'] = filter.value;
            }
        } else if (filterName === 'category') {
            if (qFilters.filter['categories']) {
                if (isArray(qFilters.filter['categories'])) {
                    qFilters.filter['categories'].push(filter.value);
                } else {
                    qFilters.filter['categories'] = [qFilters.filter['categories'], filter.value];
                }
            } else {
                qFilters.filter['categories'] = [parseInt(filter.value)];
            }
        } else if (filterName === 'sortBy') {
            const sbFilter = sortByFilters[filter.value];

            if (sbFilter) {
                Object.keys(sbFilter).forEach(key => {
                    qFilters[key] = sbFilter[key];
                });
            }
        }
    });

    if (defaultFilters && JSON.stringify(qFilters) === strQFilters) {
        return defaultFilters;
    }

    return qFilters;
}

export function getDefaultFilters() {
    return {};
    /*return {
        sortBy: 'CREATED',
        sortDir: 'DESC',
    };*/
}
