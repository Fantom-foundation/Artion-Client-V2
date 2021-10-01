/**
 * Handles route query - updates property by query and vice versa
 *
 * @param {string} propertyName Name of property defined in `data`. Property has to be of type Object.
 * @return {{watch: {[p: string]: {handler(*): void, immediate: boolean}, $route: {handler(*): void, immediate: boolean}}, created(): void}}
 */
export function routeQueryMixin(propertyName) {
    return {
        watch: {
            $route: {
                handler(value) {
                    if (!this.__ignoreRouteChange) {
                        this.__ignorePropertyChange = true;

                        this[propertyName] = { ...value.query };

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
                    this.$router.push({ name: this.$route.name, query: { ...value } });
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
    };
}
