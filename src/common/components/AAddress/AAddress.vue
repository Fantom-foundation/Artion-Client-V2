<template>
    <span class="aaddress">
        <f-image v-if="!isAccount || imageSrc" :src="imageSrc" fit="cover" size="24px" class="placeholder-noimage" />
        <template v-else><div class="aaddress_jazzicon" v-html="jazzicon"></div></template>
        <span v-if="name">{{ name }}</span>
        <f-ellipsis v-else :text="address" overflow="middle" />
    </span>
</template>

<script>
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import { getImageThumbUrl } from '@/utils/url.js';
import { getJazzicon } from '@/utils/jazzicon.js';

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
        /** If true, use jazzicon as a placeholder */
        isAccount: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        imageSrc() {
            return this.image ? getImageThumbUrl(this.image) : '';
        },

        jazzicon() {
            return getJazzicon(this.address);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
