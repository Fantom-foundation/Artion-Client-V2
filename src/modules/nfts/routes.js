import { i18n } from '@/plugins/vue-i18n.js';

import Explore from '@/modules/nfts/views/Explore/Explore.vue';
import NftDetail from '@/modules/nfts/views/NftDetail/NftDetail.vue';
import NftCreate from '@/modules/nfts/views/NftCreate/NftCreate.vue';

export function getNftsRoutes() {
    return [
        {
            path: '/explore',
            name: 'explore',
            component: Explore,
            meta: {
                title: i18n.t('page.explore.title'),
            },
        },
        {
            path: '/explore/:tokenContract/:tokenId',
            name: 'nft-detail',
            component: NftDetail,
        },
        {
            path: '/create',
            name: 'nft-create',
            component: NftCreate,
            meta: {
                title: i18n.t('page.nftCreate.title'),
            },
        },
    ];
}
