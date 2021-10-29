import AppIconset from './AppIconset.vue';

export default {
    title: 'Components/AppIconset',
    component: AppIconset,
};

export const Default = () => ({
    components: { AppIconset },
    template: `
        <div class="gridauto gridauto-miw-128">
            <div v-for="icon in iconList" class="flex flex-column ali-center">
                <app-iconset :icon="icon" size="32px" original />
                <span class="fos-4 co-grey-6 pat-1">{{ icon }}</span>
            </div>
        </div>
    `,
    data() {
        return {
            iconList: [
                'card1',
                'card2',
                'card3',
                'card4',
                'magnifier',
                'bear',
                'cardboard',
                'domain',
                'joystick',
                'monster',
                'soccerball',
                'rainbow',
                'tools',
                'metamask',
                'coinbase',
                'close',
                'like',
                'liked',
                'check',
                'question',
                'share',
                'twitter',
                'facebook',
                'logo',
                'about',
                'chain',
                'web',
                'telegram',
                'discord',
                'view',
                'graf',
                'tag',
                'list',
                'collection',
                'property',
                'solid1',
                'solid2',
                'filter',
                'eyeslash',
                'history',
                'paint',
                'arrowright',
                'notify',
                'user',
                'instagram',
                'copy',
                'nft',
                'medium',
            ],
        };
    },
});
