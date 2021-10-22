<template>
    <div class="pg-nft-card pg-nft-card--generic">
        <div class="pg-nft-card__img-cont">
            <a-video v-if="isVideo" :poster="getImageThumbUrl(token.imageThumb)" :src="token.image" loop></a-video>
            <f-image v-else :src="getImageThumbUrl(token.imageThumb)" :alt="token.name"></f-image>
        </div>
        <div class="pg-nft-card__cta" @click="$refs.cardDetailModal.show()">
            <div class="pg-nft-card__cta-top">
                <div>
                    <h6 class="h6 " v-html="token.name"></h6>
                    <h4 class="h4">#{{ parseInt(token.tokenId, 16) }}</h4>
                </div>
            </div>
        </div>

        <f-window ref="cardDetailModal" class="pg-nft-card__detail-modal">
            <p-g-nft-card-generic :token="token"></p-g-nft-card-generic>
        </f-window>
    </div>
</template>

<script>
import { getImageThumbUrl } from '@/utils/url.js';
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow';
import FImage from 'fantom-vue-components/src/components/FImage/FImage';
import AVideo from '@/common/components/AVideo/AVideo.vue';
import { CONTRACTS_FILTER } from '../PGMyNftsList/PGMyNftsList.vue';

export default {
    name: 'PGNftCardGeneric',

    components: {
        FWindow,
        FImage,
        AVideo,
    },

    props: {
        token: {
            type: Object,
            default: null,
        },
    },

    computed: {
        isVideo() {
            return CONTRACTS_FILTER.includes(this.token.contract);
        },
    },

    methods: {
        getImageThumbUrl,
    },
};
</script>
