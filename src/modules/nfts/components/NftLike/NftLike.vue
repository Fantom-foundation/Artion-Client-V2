<template>
    <span :class="{ 'color-clicked': isLiked }">
        <button
            :aria-label="`${$t('like')} ${token.name}`"
            :data-tooltip="$t('nftcard.favorite')"
            @click.prevent="onLikeClick"
        >
            <app-iconset :icon="isLiked ? 'liked' : 'like'" :class="{ 'icon-liked': isLiked }" size="20px" />
        </button>
        <span class="nftcard_counter">
            {{ likesCount }}
            {{ label }}
        </span>
    </span>
</template>

<script>
import { toInt } from '@/utils/big-number';
import { checkSignIn } from '@/modules/account/auth';
import { likeToken, unlikeToken } from '@/modules/nfts/mutations/likes';

export default {
    name: 'NftLike',

    props: {
        token: {
            type: Object,
        },
        label: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            likesCount: 0,
            isLiked: false,
        };
    },

    watch: {
        token: {
            async handler(_value) {
                this.isLiked = _value.isLiked;
                this.likesCount = toInt(_value.likes) || (this.isLiked ? 1 : 0);
            },
            immediate: true,
            deep: true,
        },
    },

    methods: {
        async onLikeClick() {
            if (!(await checkSignIn())) {
                return;
            }

            if (!this.isLiked) {
                this.isLiked = true;
                this.likesCount++;
                let res = await likeToken(this.token);
                console.log('likeToken', res);
                this.$emit('nft-like');
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('nftlike.likeAdded', { token: this.token.name }),
                });
            } else {
                this.isLiked = false;
                if (this.likesCount > 0) this.likesCount--;
                let res = await unlikeToken(this.token);
                console.log('unlikeToken', res);
                this.$emit('nft-unlike');
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('nftlike.likeRemoved', { token: this.token.name }),
                });
            }
        },
    },
};
</script>
