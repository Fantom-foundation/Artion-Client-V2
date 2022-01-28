import { clone, defer, isObjectEmpty, objectEquals } from 'fantom-vue-components/src/utils';

export const dataPageMixin = {
    data() {
        return {
            items: [],
            perPage: 20,
            totalItems: 0,
            loading: false,
            gridItemsSet: false,
            hasNextPage: true,
            pageInfo: {},
            pageInfoPrev: {},
        };
    },

    created() {
        this._usePageInfoPrev = false;
        /** Timestamp. Helper */
        this._ts = 0;
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
            let pageInfo = {};
            let paginationVars = {};

            this._usePageInfoPrev = pagination.prevPage > pagination.currPage;

            if (this._usePageInfoPrev && !isObjectEmpty(this.pageInfoPrev)) {
                pageInfo = this.pageInfoPrev;
            } else {
                pageInfo = this.pageInfo;
            }

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
            const ts = Date.now();

            this._ts = ts;

            if (!dontSetItems) {
                this.loading = true;
            }

            let data = await this.loadPage(pagination, filterSort);

            // Check if the latest query has the same timestamp. If not, discard the data
            if (ts < this._ts && this._ts !== 0) {
                data = null;
            }

            // console.log(ts, this._ts, ts !== this._ts, ts < this._ts);

            if (data) {
                this.totalItems = parseInt(data.totalCount, 16);

                if (!dontSetItems) {
                    this.items = this._getItemsFromData(data);
                }

                if (!this._usePageInfoPrev) {
                    this.pageInfo = clone(data.pageInfo);
                    this.pageInfo.lastVariables = clone({
                        ...pagination,
                        filterSort: filterSort,
                    });
                } else {
                    this.pageInfoPrev = clone(data.pageInfo);
                    this.pageInfoPrev.lastVariables = clone({
                        ...pagination,
                        filterSort: filterSort,
                    });
                }
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

            this.hasNextPage = this.pageInfo.hasNextPage;

            if (isNaN(this.totalItems) && !this.pageInfo.hasNextPage) {
                pagination.isLastPage = true;
            }

            if ((this.pageInfo.hasNextPage || pagination.isLastPage) && data && data.edges && data.edges.length > 0) {
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

            const data = await this._loadPage({
                pagination: this._getPaginationVariables(pagination),
                dontSetItems: true,
            });

            // if (this.pageInfo.hasNextPage && data.edges && data.edges.length > 0) {
            if (data && data.edges && data.edges.length > 0) {
                const items = this._getItemsFromData(data);

                if (!objectEquals(this.items, this._getItemsFromData(data))) {
                    this.items = items;

                    if (this.items.length > 0) {
                        this.gridItemsSet = true;
                    }
                } else {
                    this.gridItemsSet = false;
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
        async _onListboxPageChange(pagination) {
            this.loading = true;

            const data = await this._loadPage({
                pagination: { ...this._getPaginationVariables(pagination), search: pagination.filterText || '' },
                dontSetItems: true,
            });

            // if (this.pageInfo.hasNextPage && data.edges && data.edges.length > 0) {
            if (data && data.edges && data.edges.length > 0) {
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
            this.hasNextPage = true;
        },
    },
};
