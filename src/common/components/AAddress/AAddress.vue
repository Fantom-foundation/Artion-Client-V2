<template>
    <span class="aaddress">
        <img v-if="avatarSrc" :src="avatarSrc" aria-hidden="true" class="aaddress_avatar" alt="Avatar" />
        <span v-if="userName">{{ userName }}</span>
        <f-ellipsis v-else :text="cAddress" overflow="middle" />
    </span>
</template>

<script>
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import { getImageThumbUrl } from '@/utils/url.js';

export default {
    name: 'AAddress',

    components: { FEllipsis },

    props: {
        owner: {
            type: Object,
            default() {
                return {
                    address: '',
                    username: '',
                    avatarThumb: '',
                };
            },
        },
        address: {
            type: String,
            default: '',
        },
        imgSrc: {
            type: String,
            default: '',
        },
    },

    computed: {
        avatarSrc() {
            const { owner } = this;

            if (owner.avatarThumb) {
                return getImageThumbUrl(owner.avatarThumb);
            }

            return this.imgSrc;
        },

        cAddress() {
            return this.owner.address || this.address;
        },

        userName() {
            return this.owner.username || '';
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
