<template>
    <div class="pg-success-notification">
        <div class="pg-success-notification__badge">
            <div class="pg-success-notification__img-cont">
                <img src="/img/confetti.png" alt="confetti emoji" class="pg-success-notification__img-el" />
                <div class="pg-success-notification__backdrop pg-success-notification__backdrop--1"></div>
                <div class="pg-success-notification__backdrop pg-success-notification__backdrop--2"></div>
            </div>
        </div>
        <h3 class="h3 pg-success-notification__header">{{ $t('pgSuccessNotification.header') }}</h3>
        <div class="pg-success-notification__achievement">
            {{ message }} <strong v-if="isMintType">NFT #{{ id }}</strong>
        </div>
        <div class="flex juc-center">
            <span class="pg-success-notification__button">
                <f-button v-fwindow-hide size="large" :label="$t('pgSuccessNotification.continue')" />
            </span>
        </div>
    </div>
</template>

<script>
const ACHIEVEMENT_TYPE = Object.freeze({
    MINT: 0,
    BID: 1,
});

export default {
    name: 'PGSuccessNotification',

    props: {
        type: {
            type: Number,
            default: ACHIEVEMENT_TYPE.BID,
        },

        id: {
            type: [String, Number],
            default: 'NTF_ID',
        },
    },

    computed: {
        isMintType() {
            return this.type === ACHIEVEMENT_TYPE.MINT;
        },

        isBidType() {
            return this.type === ACHIEVEMENT_TYPE.BID;
        },

        message() {
            if (this.isBidType) {
                return this.$t('pgSuccessNotification.highestBidder');
            } else if (this.isMintType) {
                return this.$t('pgSuccessNotification.mintedNFT');
            }

            return null;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
