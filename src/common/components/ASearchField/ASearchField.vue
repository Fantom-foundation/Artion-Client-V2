<template>
    <f-search-field v-bind="$attrs" class="asearchfield" v-on="$listeners">
        <!-- copy slots -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>

        <template #magnifier>
            <app-iconset width="2.3em" height="1em" icon="magnifier" class="asearchfield_magnifier" />
        </template>

        <template #icon>
            <app-iconset v-if="!loading" icon="close" size="14px" />
            <span v-else><f-dots-loader size="7px"/></span>
        </template>
    </f-search-field>
</template>

<script>
import FSearchField from 'fantom-vue-components/src/components/FSearchField/FSearchField.vue';
import FDotsLoader from 'fantom-vue-components/src/components/FDotsLoader/FDotsLoader.vue';

/**
 * FSearchField wrapper
 */
export default {
    name: 'ASearchField',

    components: { FSearchField, FDotsLoader },

    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
