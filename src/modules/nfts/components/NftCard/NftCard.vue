<template>
    <div class="nftcard">
        <router-link
            :to="{ name: 'nft-detail', params: { tokenContract: nftData.contract, tokenId: nftData.tokenId } }"
        >
            <div class="nftcard_content">
                <div class="nftcard_top">
                    <div class="nftcard_itemName">
                        <h3 class="nftcard_name" :data-tooltip="nftData.name">{{ nftData.name }}</h3>
                        <div v-if="nftData.collection" class="nftcard_label" :data-tooltip="nftData.collection.name">
                            {{ nftData.collection.name }}
                            <!--                            <app-iconset icon="check" />-->
                        </div>
                    </div>
                    <div v-if="nftData.auctionReservePrice || nftData.auctionedPrice" class="nftcard_price">
                        <div class="nftcard_label">
                            {{ !nftData.auctionedPrice ? $t('nftcard.minBid') : $t('nftcard.topBid') }}
                        </div>
                        <div v-if="nftData.auctionReservePrice && !nftData.auctionedPrice">
                            <a-token-value
                                :token="nftData.auctionReservePrice.payToken"
                                :value="nftData.auctionReservePrice.amount"
                                no-symbol
                            />
                        </div>
                        <div v-if="nftData.auctionedPrice">
                            <a-token-value
                                :token="nftData.auctionedPrice.payToken"
                                :value="nftData.auctionedPrice.amount"
                                no-symbol
                            />
                        </div>
                        <div v-if="auctionEndTime" class="nftcard_timeleft">
                            {{ auctionEndTime }} {{ $t('nftcard.left') }}
                        </div>
                    </div>
                    <div
                        v-else-if="nftData.listingPrice || nftData.offeredPrice || nftData.lastTradePrice"
                        class="nftcard_price"
                    >
                        <div class="nftcard_label">{{ $t('nftcard.price') }}</div>
                        <div v-if="nftData.listingPrice">
                            <a-token-value
                                :token="nftData.listingPrice.payToken"
                                :value="nftData.listingPrice.amount"
                                no-symbol
                            />
                        </div>
                        <div v-if="nftData.offeredPrice" class="nftcard_offerprice">
                            <span class="nftcard_offerprice_label">{{ $t('nftcard.offerFor') }}</span>
                            <a-token-value
                                :token="nftData.offeredPrice.payToken"
                                :value="nftData.offeredPrice.amount"
                                no-symbol
                            />
                        </div>
                        <div v-if="nftData.lastTradePrice" class="nftcard_lastprice">
                            <span class="nftcard_lastprice_label">{{ $t('nftcard.lastPrice') }}</span>
                            <a-token-value
                                :token="nftData.lastTradePrice.payToken"
                                :value="nftData.lastTradePrice.amount"
                                no-symbol
                            />
                        </div>
                    </div>
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
            <div class="nftcard_image">
                <div class="nftcard_box">
                    <f-image size="100%" :src="getImageThumbUrl(nftData.imageThumb)" :alt="nftData.name" />
                </div>
            </div>
            <div class="nftcard_header">
                <button v-if="showBanButton" :data-tooltip="$t('nftcard.banUnban')" @click.prevent="onBanClick">
                    <app-iconset icon="ban" size="16px" :color="dBanned ? '#f00' : ''" />
                </button>
                <button
                    :aria-label="`${$t('like')} ${nftData.name}`"
                    :data-tooltip="$t('nftcard.favorite')"
                    @click.prevent="onLikeClick"
                >
                    <app-iconset :icon="liked ? 'liked' : 'like'" :class="{ 'icon-liked': liked }" size="20px" />
                </button>
                <span class="nftcard_counter">{{ tansformLikeCounter(likesCount) }}</span>
            </div>
        </router-link>
    </div>
</template>

<script>
// import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';
import { getImageThumbUrl } from '@/utils/url.js';
import { checkSignIn } from '@/modules/account/auth.js';
import { likeToken, unlikeToken } from '@/modules/nfts/mutations/likes.js';
import { toInt } from '@/utils/big-number.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import dayjs from 'dayjs';
import { banToken, unbanToken } from '@/modules/nfts/mutations/ban.js';

export default {
    // components: { AppIconset },
    name: 'NftCard',

    components: { ATokenValue },

    props: {
        nftData: {
            type: Object,
        },
    },

    data() {
        return {
            likesCount: this.nftData.likes,
            liked: false,
            showLikes: false,
            showBanButton: this.$wallet.user ? this.$wallet.user.isModerator : false,
            dBanned: this.nftData._banned || false,
        };
    },

    computed: {
        auctionEndTime() {
            const { auction } = this.nftData;

            return auction ? dayjs(auction.endTime).fromNow(true) : '';
        },
    },

    watch: {
        nftData: {
            async handler(_value) {
                this.liked = _value.isLiked;
            },
            immediate: true,
            deep: true,
        },
    },

    methods: {
        tansformLikeCounter(value) {
            return toInt(value);
        },

        async onLikeClick() {
            let ok = await checkSignIn();

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
            }
        },

        async onBanClick() {
            this.dBanned = !this.dBanned;

            if (this.dBanned) {
                await banToken(this.nftData);

                this.$emit('token-ban-unban', { token: this.nftData, ban: true });

                this.$notifications.add({
                    type: 'success',
                    text: this.$t('nftBanned'),
                });
            } else {
                await unbanToken(this.nftData);

                this.$emit('token-ban-unban', { token: this.nftData, unban: true });
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('nftUnbanned'),
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
