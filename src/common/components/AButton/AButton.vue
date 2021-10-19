<template>
    <f-button v-bind="$attrs" :label="label" v-on="$listeners" :class="{ 'btn-loading': loading }" :disabled="loading">
        <span v-if="loading" class="fbutton_spinner">
            <div class="spin"></div>
        </span>
        <span class="fbutton_content">
            <slot>{{ label }}</slot>
        </span>
    </f-button>
</template>
<script>
export default {
    name: 'AButton',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
