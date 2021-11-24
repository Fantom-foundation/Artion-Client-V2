<template>
    <div class="nftfilterchips" v-show="getChipsFromDFilters.length > 0">
        <a-filter-chips :data="getChipsFromDFilters" @change="onAFilterChipsChange" />
    </div>
</template>

<script>
import { clone, isArray } from 'fantom-vue-components/src/utils';
import AFilterChips from '@/common/components/AFilterChips/AFilterChips.vue';
import { STATUSES } from '@/common/constants/statuses.js';
//import { COLLECTIONS } from '@/common/constants/collections.js';
import { CATEGORIES } from '@/common/constants/categories.js';
import { GROUP_FILTERS } from '@/common/constants/group-filter.js';
import { SORT_BY_FILTERS } from '@/common/constants/sort-by-filters.js';
import { flattenFilters } from '@/modules/nfts/filters.js';

export default {
    name: 'NftFilterChips',

    components: { AFilterChips },

    model: {
        prop: 'filters',
        event: 'change',
    },

    props: {
        filters: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    watch: {
        dFilters: {
            handler(value) {
                if (!this._dontEmitChange) {
                    this.$emit('change', clone(value));
                }
            },
            deep: true,
        },

        filters(value) {
            this._dontEmitChange = true;

            this.dFilters = { ...value };

            this.$nextTick(() => {
                this._dontEmitChange = false;
            });
        },
    },

    data() {
        return {
            dFilters: { ...this.filters },
        };
    },

    computed: {
        translations() {
            const translations = {
                status: {},
                category: {},
                // collections: {},
                group: {},
                sortBy: {},
            };

            STATUSES().forEach(item => {
                translations.status[item.id] = this.$t(item.label);
            });

            CATEGORIES().forEach(item => {
                translations.category[item.id] = this.$t(item.label);
            });

            // COLLECTIONS().forEach(item => {
            //     translations.collections[item.value] = this.$t(item.label);
            // });

            GROUP_FILTERS().forEach(item => {
                translations.group[item.value] = this.$t(item.label);
            });

            SORT_BY_FILTERS().forEach(item => {
                translations.sortBy[item.value] = this.$t(item.label);
            });

            return translations;
        },

        getChipsFromDFilters() {
            const chips = this.getChipsFromFilters(this.dFilters);

            this.$emit('chips-change', clone(chips));

            return chips;
        },
    },

    created() {
        this._dontEmitChange = false;
    },

    methods: {
        /**
         * @param {Object} filters
         * @return {*[]}
         */
        getChipsFromFilters(filters) {
            const { translations } = this;
            let chips = flattenFilters(filters);
            chips = chips.filter(chip => {
                if (chip.filterName !== 'collections' && chip.filterName !== 'price') {
                    const transl = translations[chip.filterName];

                    if (transl) {
                        chip.label = transl[chip.value];
                    }

                    return !!transl;
                }
                return true;
            });

            chips = this.transormPriceChip(chips);

            return chips;
        },

        transormPriceChip(filters) {
            let priceFilters = filters.filter(chip => chip.filterName === 'price');
            if (priceFilters.length) {
                let min = priceFilters[0].value;
                let max = priceFilters[1].value;
                let index = filters.findIndex(item => item.filterName === 'price');
                let label;

                if (min && max) {
                    label = `${min}$ - ${max}$`;
                } else if (min && max === null) {
                    label = `> ${min}$`;
                } else {
                    label = `< ${max}$`;
                }

                let priceChip = { label, filterName: priceFilters[0].filterName };

                filters.splice(index, 2, priceChip);
            }

            return filters;
        },

        transformPriceDataFromChips(data) {
            let index = data.findIndex(item => item.filterName === 'price');
            if (index !== -1) {
                let symbolIndex;
                let possibleSymbols = ['>', '<', '-'];
                let label = data[index].label;
                let filterName = data[index].filterName;
                possibleSymbols.forEach(elem => {
                    if (label.includes(elem)) symbolIndex = label.indexOf(elem);
                });
                let symbol = label[symbolIndex];
                let re = /\d+/;

                switch (symbol) {
                    case '>':
                        {
                            let minValue = data[index].label.match(re)[0];
                            let minPriceObj = { value: minValue, filterName };
                            let maxPriceObj = { value: null, filterName };
                            data.splice(index, 1, minPriceObj);
                            data.splice(index + 1, 0, maxPriceObj);
                        }
                        break;
                    case '<':
                        {
                            let maxValue = data[index].label.match(re)[0];
                            let minPriceObj = { value: null, filterName };
                            let maxPriceObj = { value: maxValue, filterName };
                            data.splice(index, 1, minPriceObj);
                            data.splice(index + 1, 0, maxPriceObj);
                        }
                        break;
                    case '-': {
                        let subStrings = data[index].label.split('-');
                        let minValue = subStrings[0].match(re)[0];
                        let maxValue = subStrings[1].match(re)[0];
                        let minPriceObj = { value: minValue, filterName };
                        let maxPriceObj = { value: maxValue, filterName };
                        data.splice(index, 1, minPriceObj);
                        data.splice(index + 1, 0, maxPriceObj);
                    }
                }
            }

            return data;
        },

        /**
         * @param {Array} data
         * @return {{}}
         */
        getFiltersFromChips(data) {
            // const { translations } = this;
            // const { dFilters } = this;
            let filters = {};
            if (data.length === 0) {
                return {};
            } else {
                data = this.transformPriceDataFromChips(data);
                data.forEach(chip => {
                    let chipValue = chip.filterName === 'collections' ? chip : chip.value;
                    if (chip.filterName in filters) {
                        if (!isArray(filters[chip.filterName])) {
                            filters[chip.filterName] = [filters[chip.filterName]];
                        }

                        filters[chip.filterName].push(chipValue);
                    } else {
                        filters[chip.filterName] = [chipValue];
                    }
                });

                // copy dFilters which are not in translations
                // Object.keys(dFilters).forEach(filterName => {
                //     if (!(filterName in translations)) {
                //         filters = { ...filters, [filterName]: dFilters[filterName] };
                //     }
                // });
                return filters;
            }
        },

        /**
         * @param {Array} data
         */
        onAFilterChipsChange(data) {
            this.dFilters = { ...this.getFiltersFromChips(data), search: this.dFilters.search || undefined };
        },
    },
};
</script>

<style lang="scss">
//@use "style";
</style>
