<template>
    <f-details v-bind="$attrs" animate strategy="create" class="adetails" v-on="$listeners">
        <!-- copy slots -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>
    </f-details>
</template>

<script>
import FDetails from 'fantom-vue-components/src/components/FDetails/FDetails.vue';

/**
 * FDetails wrapper
 */
export default {
    name: 'ADetails',

    components: { FDetails },

    inheritAttrs: false,
};
</script>

<style lang="scss">
@use "style";
</style>
