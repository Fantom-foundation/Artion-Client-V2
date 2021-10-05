<template>
    <f-placeholder v-bind="$attrs" animation="fplaceholder-pulsebganim" v-on="$listeners">
        <slot></slot>
    </f-placeholder>
</template>

<script>
import FPlaceholder from 'fantom-vue-components/src/components/FPlaceholder/FPlaceholder.vue';

/**
 * FPlaceholder wrapper
 */
export default {
    name: 'APlaceholder',

    components: { FPlaceholder },

    inheritAttrs: false,
};
</script>
