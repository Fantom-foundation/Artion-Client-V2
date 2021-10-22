<template>
    <div class="pg-nft-card pg-nft-card--generic">
        <div class="pg-nft-card__img-cont">
            <!--            <f-image :src="getImageThumbUrl(token.imageThumb)" :alt="token.name"></f-image>-->
            <a-video :poster="token.poster" :src="token.videoSrc" loop></a-video>
        </div>
        <div class="pg-nft-card__cta" @click="$refs.cardDetailModal.show()">
            <div class="pg-nft-card__cta-top">
                <div>
                    <h6 class="h6 " v-html="token.name"></h6>
                    <h4 class="h4">#140</h4>
                </div>
            </div>
        </div>

        <f-window ref="cardDetailModal" class="pg-nft-card__detail-modal">
            <p-g-nft-card-generic :token="token"></p-g-nft-card-generic>
        </f-window>
    </div>
</template>

<script>
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow';
// import FImage from 'fantom-vue-components/src/components/FImage/FImage';
import { getImageThumbUrl } from '@/utils/url.js';
import AVideo from '@/common/components/AVideo/AVideo.vue';

export default {
    name: 'PGNftCardGeneric',

    props: {
        token: {
            type: Object,
            default: null,
        },
    },

    components: {
        FWindow,
        // FImage,
        AVideo,
    },

    methods: {
        getImageThumbUrl,
    },
};
</script>
