<template>
    <f-window ref="window" :check-components-change="false" v-bind="$attrs" v-on="$listeners">
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
import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';

/**
 * FWindow wrapper
 */
export default {
    name: 'AWindow',

    components: { FWindow, AppIconset },

    inheritAttrs: false,

    methods: {
        ...copyMethods(FWindow, ['show', 'hide', 'toggle'], 'window'),
    },
};
</script>

<style scoped></style>
