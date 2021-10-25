<template>
    <div class="pg-nft-card pg-nft-card--generic">
        <div class="pg-nft-card__img-cont">
            <a-video v-if="isVideo" :poster="getImageThumbUrl(token.imageThumb)" :src="token.image" loop></a-video>
            <f-image v-else :src="getImageThumbUrl(token.imageThumb)" :alt="token.name"></f-image>
        </div>
        <div class="pg-nft-card__cta" @click="onCardClick">
            <div class="pg-nft-card__cta-top">
                <div>
                    <h6 class="h6 " v-html="token.name"></h6>
                    <h4 class="h4">#{{ parseInt(token.tokenId, 16) }}</h4>
                </div>
            </div>
            <div v-if="!noRedeemButton" class="pg-nft-card__cta-button pg-nft-card__button">
                <!--                <a-button label="Redeem available from 10/25" :disabled="true" size="large" />-->
                <a-button label="Redeem" size="large" @click.native="onRedeemButtonClick" />
            </div>
        </div>

        <f-window ref="cardDetailModal" class="pg-nft-card__detail-modal">
            <p-g-nft-card-generic :token="token" no-redeem-button></p-g-nft-card-generic>
        </f-window>

        <nft-redeem-window ref="redeemWindow" :token="token" />
    </div>
</template>

<script>
import { getImageThumbUrl } from '@/utils/url.js';
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow';
import FImage from 'fantom-vue-components/src/components/FImage/FImage';
import AVideo from '@/common/components/AVideo/AVideo.vue';
import { CONTRACTS_FILTER } from '../PGMyNftsList/PGMyNftsList.vue';
import AButton from '@/common/components/AButton/AButton.vue';
import NftRedeemWindow from '@/modules/nfts/components/NftRedeemWindow/NftRedeemWindow.vue';
import { checkSignIn } from '@/modules/account/auth.js';

export default {
    name: 'PGNftCardGeneric',

    components: {
        NftRedeemWindow,
        AButton,
        FWindow,
        FImage,
        AVideo,
    },

    props: {
        token: {
            type: Object,
            default: null,
        },
        noRedeemButton: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        isVideo() {
            return CONTRACTS_FILTER.includes(this.token.contract);
        },
    },

    methods: {
        onCardClick(event) {
            if (!event.target.closest('.pg-nft-card__cta-button')) {
                this.$refs.cardDetailModal.show();
            }
        },

        async onRedeemButtonClick() {
            const ok = await checkSignIn();

            if (ok) {
                this.$refs.redeemWindow.show();
            }
        },

        getImageThumbUrl,
    },
};
</script>
