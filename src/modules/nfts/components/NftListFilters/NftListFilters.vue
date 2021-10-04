<template>
    <div class="nftlistfilters">
        <group-filter v-model="dFilters.group" :aria-label="$t('nftlistfilters.groupFilters')" />
        <sort-by-filter v-model="dFilters.sortBy" :aria-label="$t('nftlistfilters.sortbyFilters')" />
    </div>
</template>

<script>
import { clone } from 'fantom-vue-components/src/utils';
import GroupFilter from '@/modules/nfts/components/GroupFilter/GroupFilter.vue';
import SortByFilter from '@/modules/nfts/components/SortByFilter/SortByFilter.vue';

export default {
    name: 'NftListFilters',

    components: { SortByFilter, GroupFilter },

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

    created() {
        this._dontEmitChange = false;
    },
};
</script>

<style lang="scss">
@use "style";
</style>
