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
import IconMetamask from '@/assets/vue-icons/IconMetamask.vue';
import IconCoinbase from '@/assets/vue-icons/IconCoinbase.vue';
import IconClose from '@/assets/vue-icons/IconClose.vue';
import IconLike from '@/assets/vue-icons/IconLike.vue';
import IconLiked from '@/assets/vue-icons/IconLiked.vue';
import IconCheck from '@/assets/vue-icons/IconCheck.vue';
import IconQuestion from '@/assets/vue-icons/IconQuestion.vue';
import IconShare from '@/assets/vue-icons/IconShare.vue';
import IconTwitter from '@/assets/vue-icons/IconTwitter.vue';
import IconFacebook from '@/assets/vue-icons/IconFacebook.vue';
import IconLogo from '@/assets/vue-icons/IconLogo.vue';
import IconAbout from '@/assets/vue-icons/IconAbout.vue';
import IconChain from '@/assets/vue-icons/IconChain.vue';
import IconWeb from '@/assets/vue-icons/IconWeb.vue';
import IconTelegram from '@/assets/vue-icons/IconTelegram.vue';
import IconInstagram from '@/assets/vue-icons/IconInstagram.vue';
import IconDiscord from '@/assets/vue-icons/IconDiscord.vue';
import IconView from '@/assets/vue-icons/IconView.vue';
import IconGraf from '@/assets/vue-icons/IconGraf.vue';
import IconTag from '@/assets/vue-icons/IconTag.vue';
import IconList from '@/assets/vue-icons/IconList.vue';
import IconCollection from '@/assets/vue-icons/IconCollection.vue';
import IconProperty from '@/assets/vue-icons/IconProperty.vue';
import IconSolid1 from '@/assets/vue-icons/IconSolid1.vue';
import IconSolid2 from '@/assets/vue-icons/IconSolid2.vue';
import IconFilter from '@/assets/vue-icons/IconFilter.vue';
import IconEyeslash from '@/assets/vue-icons/IconEyeslash.vue';
import IconHistory from '@/assets/vue-icons/IconHistory.vue';
import IconPaint from '@/assets/vue-icons/IconPaint.vue';
import IconArrowright from '@/assets/vue-icons/IconArrowright.vue';
import IconNotify from '@/assets/vue-icons/IconNotify.vue';
import IconUser from '@/assets/vue-icons/IconUser.vue';
import IconCopy from '@/assets/vue-icons/IconCopy.vue';
import IconPlay from '@/assets/vue-icons/IconPlay.vue';
import IconPause from '@/assets/vue-icons/IconPause.vue';
import IconNft from '@/assets/vue-icons/IconNft.vue';
import IconMedium from '@/assets/vue-icons/IconMedium.vue';

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
        IconMetamask,
        IconCoinbase,
        IconClose,
        IconLike,
        IconLiked,
        IconCheck,
        IconQuestion,
        IconShare,
        IconTwitter,
        IconFacebook,
        IconLogo,
        IconAbout,
        IconChain,
        IconWeb,
        IconTelegram,
        IconDiscord,
        IconView,
        IconGraf,
        IconTag,
        IconList,
        IconCollection,
        IconProperty,
        IconSolid1,
        IconSolid2,
        IconFilter,
        IconEyeslash,
        IconHistory,
        IconPaint,
        IconArrowright,
        IconNotify,
        IconUser,
        IconInstagram,
        IconCopy,
        IconPlay,
        IconPause,
        IconNft,
        IconMedium,
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
