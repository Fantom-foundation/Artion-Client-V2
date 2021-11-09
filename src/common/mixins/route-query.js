/**
 * Handles route query - updates property by query and vice versa
 *
 * @param {string} propertyName Name of property defined in `data`. Property has to be of type Object.
 * @return {{watch: {[p: string]: {handler(*): void, immediate: boolean}, $route: {handler(*): void, immediate: boolean}}, created(): void}}
 */
import { clone, isObject, isArray } from 'fantom-vue-components/src/utils';
import { getCollection } from '@/modules/nfts/queries/collection.js';

export function routeQueryMixin(propertyName) {
    return {
        watch: {
            $route: {
                async handler(value) {
                    if (!this.__ignoreRouteChange) {
                        this.__ignorePropertyChange = true;
                        let query;
                        let transformCollectionQuery = await this.transformCollectionQuery(value.query, this.filters);
                        query = clone(value.query);
                        if (isArray(transformCollectionQuery)) {
                            query.collections = [...transformCollectionQuery];
                        } else if (typeof transformCollectionQuery.collections === 'string') {
                            query.collections = [transformCollectionQuery.collections];
                        }

                        this[propertyName] = { ...query };

                        this.$nextTick(() => {
                            this.__ignorePropertyChange = false;
                        });
                    }
                },
                immediate: true,
            },

            [propertyName](value) {
                this.__ignoreRouteChange = true;

                if (!this.__ignorePropertyChange) {
                    let query = clone(value);
                    if ('collections' in value) query.collections = query.collections.map(item => item.value);
                    if (this.checkCurrentDuplicateRoute(query))
                        this.$router.push({ name: this.$route.name, query: { ...query } });
                }

                this.$nextTick(() => {
                    this.__ignoreRouteChange = false;
                });
            },
        },
        created() {
            this.__ignoreRouteChange = false;
            this.__ignorePropertyChange = false;
        },

        methods: {
            checkCurrentDuplicateRoute(query) {
                let routerName = this.$route.name;
                const resolved = this.$router.resolve({
                    routerName,
                    query: { ...query },
                });
                const newRoute = resolved.href.replace('#', '');
                const oldRoute = this.$route.fullPath;

                if (newRoute !== oldRoute) return true;

                return false;
            },

            async transformCollectionQuery(newValue, oldValue) {
                if (isArray(newValue.collections) && !isObject(newValue.collections[0])) {
                    let res = Promise.all(
                        newValue.collections.map(async newItem => {
                            let item;
                            if (oldValue.collections && isArray(oldValue.collections)) {
                                item = oldValue.collections.find(oldItem => oldItem.value === newItem);
                                if (item === undefined) {
                                    let { name, contract } = await getCollection(newItem);
                                    item = { label: name, value: contract };
                                }
                            } else {
                                let { name, contract } = await getCollection(newItem);
                                item = { label: name, value: contract };
                            }
                            return item;
                        })
                    );
                    return await res;
                } else if (typeof newValue.collections === 'string') {
                    let item;
                    if (oldValue.collections && isArray(oldValue.collections)) {
                        item = oldValue.collections.find(oldItem => oldItem.value === newValue.collections);
                        if (item === undefined) {
                            let { name, contract } = await getCollection(newValue.collections);
                            item = { label: name, value: contract };
                        }
                    } else {
                        let { name, contract } = await getCollection(newValue.collections);
                        item = { label: name, value: contract };
                    }
                    return [item];
                }

                return newValue;
            },
        },
    };
}
