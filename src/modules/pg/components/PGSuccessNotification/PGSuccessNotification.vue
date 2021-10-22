<template>
    <div class="pg-success-notification" :class="{ 'pg-success-notification--mint': type === 'mint' }">
        <div class="pg-success-notification__badge">
            <div class="pg-success-notification__img-cont">
                <img src="img/confetti.png" alt="confetti emoji" class="pg-success-notification__img-el" />
                <div class="pg-success-notification__backdrop pg-success-notification__backdrop--1"></div>
                <div class="pg-success-notification__backdrop pg-success-notification__backdrop--2"></div>
            </div>
        </div>
        <h3 class="h3 pg-success-notification__header">{{ $t('pgSuccessNotification.header') }}</h3>
        <!--        <div class="pg-success-notification__achievement">
            {{ message }} <strong v-if="type === 'mint'">NFT #{{ id }}</strong>
        </div>-->
        <div class="flex juc-center">
            <span class="pg-success-notification__button">
                <f-button
                    v-fwindow-hide
                    size="large"
                    :label="$t('pgSuccessNotification.continue')"
                    @click.native="onButtonClick"
                />
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PGSuccessNotification',

    props: {
        type: {
            type: String,
            default: 'bid',
            validator: function(_value) {
                return ['bid', 'mint'].indexOf(_value) !== -1;
            },
        },

        id: {
            type: [String, Number],
            default: 'NTF_ID',
        },
    },

    computed: {
        message() {
            if (this.type === 'bid') {
                return this.$t('pgSuccessNotification.highestBidder');
            } else if (this.type === 'mint') {
                return this.$t('pgSuccessNotification.mintedNFT');
            }

            return null;
        },
    },

    methods: {
        onButtonClick() {
            if (this.type === 'mint') {
                this.$router.push({ name: 'pg-account-my-nfts' });
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
