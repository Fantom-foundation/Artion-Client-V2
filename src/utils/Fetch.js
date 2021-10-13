// import { getCurrentHttpProvider } from '@/plugins/apollo/apollo-provider.js';
import { getNestedProp } from 'fantom-vue-components/src/utils/index.js';

function getCurrentHttpProvider() {
    return 'https://xapi-nodee.fantom.network/';
}

export class Fetch {
    static query(query) {
        return Fetch.gqlQuery(query);
    }

    /**
     * Fetch graphql query.
     *
     * @param {{variables: {}, query: object|string, operationName: string}} _query
     * @return {Promise<*>}
     */
    static async gqlQuery(_query) {
        if (!_query.operationName && typeof _query.query === 'object') {
            const od = _query.query.definitions.find(_item => _item.kind === 'OperationDefinition');

            if (od && od.name) {
                _query.operationName = od.name.value;
            }
        }

        const data = await Fetch.fetch({
            operationName: _query.operationName,
            variables: _query.variables,
            query: _query.query.loc ? _query.query.loc.source.body : _query.query,
        });

        if (data && data.errors && data.errors.length > 0) {
            const errors = [];

            data.errors.forEach(error => {
                errors.push(error.message);
            });

            throw new Error(errors.join(' '));
        }

        return data;
    }

    /**
     * Fetch all records.
     *
     * @param {{variables: {}, query: object|string, operationName: string}} _query
     * @param {string} _queryName
     * @param {object} _pageInfo
     * @return {Promise<[]>}
     */
    static async allGglQuery(_query, _queryName, _pageInfo) {
        let edges = [];
        let pageInfo = _pageInfo || { hasNext: true, last: null };
        let data;
        let item;
        const nested = _queryName.indexOf('.') > -1;

        while (pageInfo && pageInfo.hasNext) {
            _query.variables.cursor = pageInfo.last;

            data = await Fetch.gqlQuery(_query);

            if (nested) {
                item = getNestedProp(data.data, _queryName);
            } else {
                item = data.data[_queryName];
            }

            if (item) {
                pageInfo = item.pageInfo;
                if (item.edges) {
                    edges = edges.concat(item.edges);
                }
            } else {
                pageInfo = null;
            }
        }

        if (nested) {
            if (item) {
                item.edges = edges;
            }
            return data;
        } else {
            return edges;
        }
    }

    /**
     * @param {object} _data
     * @param {string} _url
     * @param {string} [_method]
     * @return {Promise<*>}
     * @private
     */
    static async fetch(_data, _url = getCurrentHttpProvider(), _method = 'POST') {
        const fetchOptions = {
            method: _method,
            headers: {
                'Content-type': 'application/json',
            },
        };
        let response = null;
        let resp = null;

        fetchOptions.body = JSON.stringify(_data || {});

        response = await fetch(_url, fetchOptions);

        if (fetchOptions.headers['Content-type'] === 'application/json') {
            resp = await response.json();
        } else {
            resp = response.text();
        }

        return resp;
    }
}
