<template>
    <div class="adetailsgroup" :class="{ 'adetailsgroup-rounded': rounded }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ADetailsGroup',

    props: {
        rounded: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
