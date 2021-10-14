<template>
    <transition-group name="pg-modal">
        <div class="pg-modal__mask" key="mask"></div>

        <div class="pg-modal__wrapper" key="modal">
            <div class="pg-modal__container">
                <div class="pg-modal__header">
                    <h5 class="h5">{{ $t('pgModal.heading') }}</h5>
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

    components: { AppIconset },
};
</script>

<style lang="scss">
@use "style";
</style>
