<template>
    <span class="aaddress">
        <img v-if="imgSrc" :src="imgSrc" aria-hidden="true" class="aaddress_avatar" alt="Avatar" />
        <f-ellipsis :text="address" overflow="middle" />
    </span>
</template>

<script>
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';

export default {
    name: 'AAddress',

    components: { FEllipsis },

    props: {
        address: {
            type: String,
            default: '',
        },
        imgSrc: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
