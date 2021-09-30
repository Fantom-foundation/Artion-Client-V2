<template>
    <f-listbox
        :data="cCategories"
        :value="parseInt(selected, 10)"
        @component-change="onListboxItemSelected"
        class="categoriesfilter"
    >
        <template v-slot="{ item }">
            <div class="categoriesfilter_item">
                <app-iconset :icon="item.icon" original />
                {{ $t(item.label) }}
            </div>
        </template>
    </f-listbox>
</template>

<script>
import { CATEGORIES } from '@/common/constants/categories.js';
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import { clone } from 'fantom-vue-components/src/utils';
import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';

export default {
    name: 'CategoriesFilter',

    components: { FListbox, AppIconset },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        /** @type {Category[]} */
        categories: {
            type: Array,
            default() {
                return clone(CATEGORIES);
            },
        },
        selected: {
            type: [Number, String],
            default: '',
        },
    },

    computed: {
        cCategories() {
            return this.categories.map((category, idx) => {
                // return { ...category, value: category.id, label: this.$t(category.label), id: undefined };
                return { ...category, value: category.id, id: undefined, _idx: idx };
            });
        },
    },

    methods: {
        onListboxItemSelected(item) {
            this.$emit('change', this.categories[item._idx].id);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
