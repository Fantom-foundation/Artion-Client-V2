<template>
    <transition-group name="pg-modal">
        <div class="pg-modal__mask" key="mask" @click="$emit('close')"></div>

        <div class="pg-modal__wrapper" key="modal">
            <div class="pg-modal__container">
                <div v-if="!noHeading" class="pg-modal__header">
                    <h5 class="h5">{{ header }}</h5>
                    <span class="pg-modal__close-button" @click="$emit('close')">
                        <app-iconset icon="close"></app-iconset>
                    </span>
                </div>
                <slot></slot>
            </div>
        </div>
    </transition-group>
</template>

<script>
import AppIconset from '../../../app/components/AppIconset/AppIconset';

export default {
    name: 'PGModal',

    props: {
        header: {
            type: String,
            default: 'Modal Header',
        },

        noHeading: {
            type: Boolean,
            default: false,
        },
    },

    components: { AppIconset },
};
</script>

<style lang="scss">
@use "style";
</style>
