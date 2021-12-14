<template>
    <div class="nftitemactivityfilterchips">
        <a-filter-chips :data="dFilters" @change="onAFilterChipsChange" />
    </div>
</template>

<script>
import AFilterChips from '@/common/components/AFilterChips/AFilterChips.vue';
export default {
    name: 'NftItemActivityFilterChips',

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

    computed: {
        dFilters() {
            return Object.keys(this.filters).map(item => {
                return { label: item };
            });
        },
    },

    methods: {
        onAFilterChipsChange(items) {
            const filters = {};
            items.forEach(item => (filters[item.label] = this.filters[item.label]));
            this.$emit('change', filters);
        },
    },
};
</script>

<style></style>
