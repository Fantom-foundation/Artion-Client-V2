<template>
    <span class="aaddress">
        <f-image :src="imageSrc" fit="cover" size="24px" />
        <span v-if="name">{{ name }}</span>
        <f-ellipsis v-else :text="address" overflow="middle" />
    </span>
</template>

<script>
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import { getImageThumbUrl } from '@/utils/url.js';

export default {
    name: 'AAddress',

    components: { FEllipsis },

    props: {
        address: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
    },

    computed: {
        imageSrc() {
            return this.image ? getImageThumbUrl(this.image) : '';
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
