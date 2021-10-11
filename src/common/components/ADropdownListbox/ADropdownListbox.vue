<template>
    <f-dropdown-listbox v-bind="$attrs" button-class="inp inp-lg" class="adropdownlistbox" v-on="$listeners">
        <!-- copy slots -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>
    </f-dropdown-listbox>
</template>

<script>
import FDropdownListbox from 'fantom-vue-components/src/components/FDropdownListbox/FDropdownListbox.vue';

/**
 * FDropdownListbox wrapper
 */
export default {
    name: 'ADropdownListbox',

    components: { FDropdownListbox },

    model: {
        prop: 'value',
        event: 'change',
    },

    inheritAttrs: false,
};
</script>

<style lang="scss">
@use "style";
</style>
