<template>
    <div class="appsearchbar">
        <f-input
            field-size="large"
            :aria-label="$t('appsearchbar.label')"
            :placeholder="$t('appsearchbar.placeholder')"
            no-label
        >
            <!-- copy slots -->
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>

            <template #prefix>
                <app-iconset width="2.3em" height="1em" icon="magnifier" class="appsearchbar_magnifier" />
            </template>
        </f-input>
    </div>
</template>

<script>
import FInput from 'fantom-vue-components/src/components/FInput/FInput.vue';

export default {
    components: { FInput },

    name: 'AppSearchBar',
};
</script>

<style lang="scss">
@use "style";
</style>
