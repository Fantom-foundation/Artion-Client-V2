import { clone, defer, objectEquals } from 'fantom-vue-components/src/utils';

export const dataPageMixin = {
    data() {
        return {
            items: [],
            perPage: 20,
            totalItems: 0,
            loading: false,
            pageInfo: {},
        };
    },

    methods: {
        async loadPage() {},

        /**
         * Get pagination variables for query.
         *
         * @param {Object} pagination
         * @returns {{first?: number, last?: number, before?: string, after?: string}}
         * @private
         */
        _getPaginationVariables(pagination) {
            const { pageInfo } = this;
            let paginationVars = {};

            if (pagination.type === 'reload' && !pagination.isFirstPage && !pagination.isLastPage) {
                paginationVars = pageInfo.lastVariables;
            } else if (pagination.isFirstPage) {
                paginationVars.first = this.perPage;
            } else if (pagination.isLastPage) {
                paginationVars.last = pagination.totalItems % pagination.perPage || this.perPage;
            } else if (pagination.prevPage < pagination.currPage) {
                // next page
                paginationVars.first = this.perPage;
                paginationVars.after = pageInfo.endCursor;
            } else {
                // previous page
                paginationVars.last = this.perPage;
                paginationVars.before = pageInfo.startCursor;
            }

            return paginationVars;
        },

        _getItemsFromData(data) {
            return data.edges.map(edge => edge.node);
        },

        /**
         * Mixin internal: loads items using loadPage
         * @private
         */
        async _loadPage({ pagination = { first: this.perPage }, filterSort, dontSetItems = false } = {}) {
            if (!dontSetItems) {
                this.loading = true;
            }

            const data = await this.loadPage(pagination, filterSort);

            if (data) {
                this.totalItems = parseInt(data.totalCount, 16);

                if (!dontSetItems) {
                    this.items = this._getItemsFromData(data);
                }

                this.pageInfo = data.pageInfo;
                this.pageInfo.lastVariables = clone({
                    ...pagination,
                    filterSort: filterSort,
                });
            }

            if (!dontSetItems) {
                defer(() => {
                    this.loading = false;
                });
            }

            return data;
        },

        /**
         * @param {Object} pagination
         * @private
         */
        async _onPageChange(pagination) {
            this.loading = true;

            const data = await this._loadPage({
                pagination: this._getPaginationVariables(pagination),
                dontSetItems: true,
            });

            if (this.pageInfo.hasNextPage && data.edges && data.edges.length > 0) {
                const items = this._getItemsFromData(data);

                if (pagination.currPage < pagination.prevPage) {
                    this.items = items.concat(this.items);
                } else {
                    this.items = this.items.concat(items);
                }

                defer(() => {
                    this.loading = false;
                });
            }
        },

        /**
         * @param {Object} pagination
         * @private
         */
        async _onGridPageChange(pagination) {
            this.loading = true;

            console.log('_onGridPageChange', JSON.stringify(pagination));
            console.log('this.pageInfo', JSON.stringify(this.pageInfo));

            const data = await this._loadPage({
                pagination: this._getPaginationVariables(pagination),
                dontSetItems: true,
            });

            // if (this.pageInfo.hasNextPage && data.edges && data.edges.length > 0) {
            if (data.edges && data.edges.length > 0) {
                const items = this._getItemsFromData(data);

                if (!objectEquals(this.items, this._getItemsFromData(data))) {
                    this.items = items;
                }

                defer(() => {
                    this.loading = false;
                });
            }
        },

        _resetData() {
            this.pageInfo = {};
            this.items = [];
            this.totalItems = 0;
        },
    },
};
