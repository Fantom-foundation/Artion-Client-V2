<template>
    <f-window ref="window" v-bind="$attrs" aria-label="bitch window">
        <!-- copy slots -->
        <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
        </template>

        <template #close-button-content>
            <app-iconset icon="close" size="16px" />
        </template>
    </f-window>
</template>

<script>
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow.vue';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';

/**
 * FWindow wrapper
 */
export default {
    name: 'AWindow',

    components: { FWindow },

    inheritAttrs: false,

    methods: {
        ...copyMethods(FWindow, ['show', 'hide', 'toggle'], 'window'),
    },
};
</script>

<style scoped></style>
