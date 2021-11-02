<template>
    <div class="nftfilterchips" v-show="getChipsFromDFilters.length > 0">
        <a-filter-chips :data="getChipsFromDFilters" @change="onAFilterChipsChange" />
    </div>
</template>

<script>
import { clone, isArray } from 'fantom-vue-components/src/utils';
import AFilterChips from '@/common/components/AFilterChips/AFilterChips.vue';
import { STATUSES } from '@/common/constants/statuses.js';
import { COLLECTIONS } from '@/common/constants/collections.js';
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
                collections: {},
                group: {},
                sortBy: {},
            };

            STATUSES().forEach(item => {
                translations.status[item.id] = this.$t(item.label);
            });

            CATEGORIES().forEach(item => {
                translations.category[item.id] = this.$t(item.label);
            });

            COLLECTIONS().forEach(item => {
                translations.collections[item.value] = this.$t(item.label);
            });

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
                const transl = translations[chip.filterName];

                if (transl) {
                    chip.label = transl[chip.value];
                }

                return !!transl;
            });

            return chips;
        },

        /**
         * @param {Array} data
         * @return {{}}
         */
        getFiltersFromChips(data) {
            const { translations } = this;
            const { dFilters } = this;
            let filters = {};

            if (data.length === 0) {
                return {};
            } else {
                data.forEach(chip => {
                    if (chip.filterName in filters) {
                        if (!isArray(filters[chip.filterName])) {
                            filters[chip.filterName] = [filters[chip.filterName]];
                        }

                        filters[chip.filterName].push(chip.value);
                    } else {
                        filters[chip.filterName] = chip.value;
                    }
                });

                // copy dFilters which are not in translations
                Object.keys(dFilters).forEach(filterName => {
                    if (!(filterName in translations)) {
                        filters = { ...filters, [filterName]: dFilters[filterName] };
                    }
                });

                return filters;
            }
        },

        /**
         * @param {Array} data
         */
        onAFilterChipsChange(data) {
            this.dFilters = this.getFiltersFromChips(data);
        },
    },
};
</script>

<style lang="scss">
//@use "style";
</style>
