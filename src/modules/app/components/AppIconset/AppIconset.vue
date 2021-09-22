<template>
    <f-svg-icon v-bind="$attrs">
        <component :is="componentName" />
    </f-svg-icon>
</template>

<script>
import FSvgIcon from 'fantom-vue-components/src/components/FSvgIcon/FSvgIcon.vue';

import IconCard1 from '@/assets/vue-icons/IconCard1.vue';
import IconCard2 from '@/assets/vue-icons/IconCard2.vue';
import IconCard3 from '@/assets/vue-icons/IconCard3.vue';
import IconCard4 from '@/assets/vue-icons/IconCard4.vue';
import IconMagnifier from '@/assets/vue-icons/IconMagnifier.vue';
import IconBear from '@/assets/vue-icons/IconBear.vue';
import IconCardboard from '@/assets/vue-icons/IconCardboard.vue';
import IconDomain from '@/assets/vue-icons/IconDomain.vue';
import IconJoystick from '@/assets/vue-icons/IconJoystick.vue';
import IconMonster from '@/assets/vue-icons/IconMonster.vue';
import IconSoccerball from '@/assets/vue-icons/IconSoccerball.vue';
import IconRainbow from '@/assets/vue-icons/IconRainbow.vue';
import IconTools from '@/assets/vue-icons/IconTools.vue';

/**
 * Icon set of default icons (from `icons` directory).
 * Inherits props from `FSvgIcon`
 */
export default {
    name: 'AppIconset',

    components: {
        FSvgIcon,
        IconCard1,
        IconCard2,
        IconCard3,
        IconCard4,
        IconMagnifier,
        IconBear,
        IconCardboard,
        IconDomain,
        IconJoystick,
        IconMonster,
        IconSoccerball,
        IconRainbow,
        IconTools,
    },

    props: {
        /** Icon name. For example icon name for `IconArrowLeft` will be `arrow-left` */
        icon: {
            type: String,
            default: '',
            required: true,
        },
    },

    computed: {
        componentName() {
            return `icon-${this.icon}`;
        },
    },
};
</script>
