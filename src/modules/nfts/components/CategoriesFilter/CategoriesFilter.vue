<template>
    <f-listbox
        :data="cCategories"
        :value="parseInt(selected, 10)"
        @component-change="onListboxItemSelected"
        __multiselect
        :aria-label="$t('categories')"
        class="categoriesfilter"
    >
        <template v-slot="{ item }">
            <div class="categoriesfilter_item tes-4">
                <div v-html="item.icon"></div>
                {{ $t(item.name) }}
            </div>
        </template>
    </f-listbox>
</template>

<script>
import { CATEGORIES } from '@/common/constants/categories.js';
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';

export default {
    name: 'CategoriesFilter',

    components: { FListbox },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        /** @type {Category[]} */
        categories: {
            type: Array,
            default() {
                return CATEGORIES();
            },
        },
        selected: {
            // type: [Array, String],
            type: [Number, String],
            default: '',
        },
    },

    computed: {
        cCategories() {
            const tmp = this.categories.map((category, idx) => {
                // return { ...category, value: category.id, label: this.$t(category.label), id: undefined };
                return { ...category, value: category.id, id: undefined, _idx: idx };
            });

            console.log(tmp);

            return tmp;
        },
    },

    created() {
        console.log(this.selected);
    },

    methods: {
        onListboxItemSelected(item) {
            this.$emit('change', this.categories[item._idx].id);
            /*this.$emit(
                'change',
                items.map(item => item.value)
            );*/
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
