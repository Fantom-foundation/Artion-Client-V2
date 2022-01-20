<template>
    <div class="nftitemactivityfilterchips">
        <a-filter-chips :data="dFilters" @change="onAFilterChipsChange" />
    </div>
</template>

<script>
import AFilterChips from '@/common/components/AFilterChips/AFilterChips.vue';
import { ITEM_ACTIVITY_FILTER_OPTIONS } from '@/modules/nfts/components/NftItemActivityFilter/filter-options.js';

export default {
    name: 'NftItemActivityFilterChips',

    components: { AFilterChips },

    model: {
        prop: 'filters',
        event: 'change',
    },

    props: {
        filters: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            filterOptions: ITEM_ACTIVITY_FILTER_OPTIONS(),
        };
    },

    computed: {
        dFilters() {
            const { filterOptions } = this;

            return this.filters.map(value => {
                const filterOption = filterOptions.find(option => option.value === value);

                if (filterOption) {
                    return {
                        label: filterOption.label,
                        value: filterOption.value,
                    };
                }

                return null;
            });
        },
    },

    methods: {
        onAFilterChipsChange(items) {
            this.$emit(
                'change',
                items.map(item => item.value)
            );
        },
    },
};
</script>

<style></style>
