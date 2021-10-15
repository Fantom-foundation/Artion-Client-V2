<template>
    <div class="density">
        <f-button
            :aria-label="$t('densityswitch.largeDisplay')"
            :data-tooltip="$t('densityswitch.largeDisplay')"
            ref="bigGridButton"
            density="280"
            @click.native="onDensitySwitchClick"
        >
            <app-iconset icon="solid2" size="24px" />
        </f-button>
        <f-button
            :aria-label="$t('densityswitch.smallDisplay')"
            :data-tooltip="$t('densityswitch.smallDisplay')"
            density="200"
            @click.native="onDensitySwitchClick"
        >
            <app-iconset icon="solid1" size="24px" />
        </f-button>
    </div>
</template>
<script>
import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';
import { SET_NFTS_DENSITY } from '@/modules/app/store/mutations.js';

export default {
    name: 'DensitySwitch',

    components: { AppIconset },

    methods: {
        onDensitySwitchClick(e) {
            const density = parseInt(e.currentTarget.getAttribute('density'));

            this.$store.commit(`app/${SET_NFTS_DENSITY}`, density);
            this.$emit('density-switch', density);
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
