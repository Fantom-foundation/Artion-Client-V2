<template>
    <div class="nftcard">
        <router-link
            :to="{ name: 'nft-detail', params: { tokenContract: nftData.contract, tokenId: nftData.tokenId } }"
        >
            <div class="nftcard_header">
                <!--                <button aria-label="Like" :data-tooltip="$t('nftcard.favorite')">
                    <app-iconset
                        :icon="liked ? 'liked' : 'like'"
                        :class="{ 'icon-liked': liked }"
                        size="20px"
                        @click.native.prevent="onLikeClick"
                    />
                </button>
                <span class="nftcard_counter">{{ likesCount }}</span>-->
            </div>
            <div class="nftcard_image">
                <div class="nftcard_box">
                    <f-image size="100%" :src="nftData.image" :alt="nftData.name" />
                </div>
            </div>
            <div class="nftcard_content">
                <div class="nftcard_top">
                    <div class="nftcard_itemName">
                        <!--                        <div class="nftcard_label">Artion <app-iconset icon="check" /></div>-->
                        <div class="nftcard_name">{{ nftData.name }}</div>
                    </div>
                    <!--                    <div class="nftcard_price">
                        <div class="nftcard_label">Auction</div>
                        <div class="nftcard_crypto">
                            <f-image :src="nftData.cryptoLogo" :alt="nftData.cryptoName" />
                            {{ nftData.crypto }}
                        </div>
                    </div>-->
                </div>
                <!--                <div class="nftcard_bottom">
                    <div class="nftcard_time">
                        <div class="nftcard_label">Time left</div>
                        <div class="nftcard_term">{{ nftData.timeLeft }}</div>
                    </div>
                    <div class="nftcard_lastPrice">
                        <div class="nftcard_label">Last Price</div>
                        <div class="nftcard_crypto">
                            <f-image :src="nftData.lastPrice.cryptoLogo" :alt="nftData.lastPrice.cryptoName" />
                            {{ nftData.lastPrice.crypto }}
                        </div>
                    </div>
                </div>-->
            </div>
        </router-link>
    </div>
</template>

<script>
// import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';
import { getCurrentHttpProvider } from '@/plugins/apollo-provider.js';

export default {
    // components: { AppIconset },
    name: 'NftCard',
    props: {
        nftData: {
            type: Object,
        },
    },
    data() {
        return {
            likesCount: this.nftData.likes,
            liked: this.nftData.liked,
        };
    },
    methods: {
        onLikeClick() {
            this.liked = !this.liked;
            if (this.liked) {
                this.likesCount++;
                // async function
            } else {
                this.likesCount--;
                // async function
            }
            this.$emit('nft-like');
        },

        getCurrentHttpProvider,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
