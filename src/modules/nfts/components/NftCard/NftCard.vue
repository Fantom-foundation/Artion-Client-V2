<template>
    <div class="nftcard">
        <router-link
            :to="{ name: 'nft-detail', params: { tokenContract: nftData.contract, tokenId: nftData.tokenId } }"
        >
            <div class="nftcard_header">
                <button aria-label="Like" :data-tooltip="$t('nftcard.favorite')">
                    <app-iconset
                        :icon="liked ? 'liked' : 'like'"
                        :class="{ 'icon-liked': liked }"
                        size="20px"
                        @click.native.prevent="onLikeClick"
                    />
                </button>
                <span class="nftcard_counter">{{ tansformLikeCounter(likesCount) }}</span>
            </div>
            <div class="nftcard_image">
                <div class="nftcard_box">
                    <f-image size="100%" :src="getImageThumbUrl(nftData.imageThumb)" :alt="nftData.name" />
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
import { getImageThumbUrl } from '@/utils/url.js';
import { getBearerToken, signIn } from '@/modules/account/auth.js';
import { likeToken, unlikeToken } from '@/modules/nfts/mutations/likes.js';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { toInt } from '@/utils/big-number.js';

export default {
    // components: { AppIconset },
    name: 'NftCard',
    mixins: [eventBusMixin],
    props: {
        nftData: {
            type: Object,
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            likesCount: this.nftData.likes,
            liked: null,
            showLikes: false,
        };
    },

    watch: {
        isFavorite: {
            async handler(_value) {
                this.liked = _value;
            },
            immediate: true,
        },
    },

    methods: {
        async checkWalletConnection() {
            if (!this.$wallet.connected) {
                const payload = {};
                this._eventBus.emit('show-wallet-picker', payload);
                await payload.promise;
            }
        },

        tansformLikeCounter(value) {
            return toInt(value);
        },

        async onLikeClick() {
            let ok = true;
            await this.checkWalletConnection();
            if (!getBearerToken()) {
                ok = await signIn();
            }
            if (ok) {
                if (!this.liked) {
                    let res = await likeToken(this.nftData);
                    console.log(res);
                    this.liked = true;
                    this.likesCount++;
                    this.$emit('nft-like');
                    this.$notifications.add({
                        type: 'success',
                        text: `You successfully added ${this.nftData.name} to your favorites`,
                    });
                } else {
                    let res = await unlikeToken(this.nftData);
                    this.liked = false;
                    console.log(res);
                    if (this.tansformLikeCounter(this.likesCount)) this.likesCount--;
                    this.$emit('nft-unlike');
                    this.$notifications.add({
                        type: 'success',
                        text: `You successfully remove ${this.nftData.name} from your favorites`,
                    });
                }
            } else {
                this.$notifications.add({
                    type: 'error',
                    text: 'Some problems',
                });
            }
        },

        getImageThumbUrl,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
