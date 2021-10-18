<template>
    <div class="pg-nft-card">
        <div class="pg-nft-card__img-cont">
            <img src="img/tmp/pg.jpeg" alt="" class="pg-nft-card__img-el" />
        </div>
        <div class="pg-nft-card__cta">
            <div class="pg-nft-card__cta-top">
                <div class="pg-nft-card__bid">
                    <h6 class="h6">{{ $t('pgNftCard.currentBid') }}</h6>

                    <template v-if="true">
                        <h4 class="h4">15,000 FTM</h4>
                        <p class="pg-nft-card__note">$28,671.45</p>
                    </template>

                    <h4 v-else class="h4">{{ $t('pgNftCard.noBids') }}</h4>
                </div>
                <div class="pg-nft-card__v-separator"></div>
                <div class="pg-nft-card__countdown">
                    <h6 class="h6">{{ $t('pgNftCard.endsIn') }}</h6>
                    <div v-if="countdown" class="pg-nft-card__countdown-time">
                        <div>
                            <h4 class="h4 pg-nft-card__countdown-number">{{ days }}</h4>
                            <div class="pg-nft-card__note">{{ $t('pgNftCard.days') }}</div>
                        </div>
                        <div>
                            <h4 class="h4 pg-nft-card__countdown-number">{{ hours }}</h4>
                            <div class="pg-nft-card__note">{{ $t('pgNftCard.hours') }}</div>
                        </div>
                        <div>
                            <h4 class="h4 pg-nft-card__countdown-number">{{ minutes }}</h4>
                            <div class="pg-nft-card__note">{{ $t('pgNftCard.minutes') }}</div>
                        </div>
                        <div>
                            <h4 class="h4 pg-nft-card__countdown-number">{{ seconds }}</h4>
                            <div class="pg-nft-card__note">{{ $t('pgNftCard.seconds') }}</div>
                        </div>
                    </div>

                    <h4 v-else class="h4">{{ $t('pgNftCard.hasEnded') }}</h4>
                </div>
            </div>

            <div class="pg-nft-card__address" :class="{ 'pg-nft-card__address--empty': !address }">{{ address }}</div>

            <div class="pg-nft-card__cta-bottom">
                <span v-if="true" class="pg-nft-card__button">
                    <f-button @click.native="$refs.modal.show()" size="large" label="Place a bid" />
                </span>
                <template v-else>
                    <wallet-button-wrap :wallet-menu="walletMenu" />
                </template>
            </div>
        </div>

        <f-window ref="modal" :title="$t('pgModal.heading')" style="max-width: 640px; min-width: 30vw;">
            <p-g-bid-form></p-g-bid-form>
        </f-window>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FWindow from 'fantom-vue-components/src/components/FWindow/FWindow.vue';
import WalletButtonWrap from '@/modules/wallet/components/WalletButtonWrap/WalletButtonWrap.vue';
import PGBidForm from '../PGBidForm/PGBidForm';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default {
    name: 'PGNftCard',

    components: {
        FWindow,
        WalletButtonWrap,
        PGBidForm,
    },

    data() {
        return {
            address: '0x56b...322a0',
            countdown: null,
            endDate: new Date('2021-10-30T23:59:59'),
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            walletMenu: [
                {
                    label: this.$t('walletMenu.settings'),
                    route: 'pg-account-settings',
                },
                {
                    label: this.$t('walletMenu.logout'),
                    action: 'logout',
                },
            ],
        };
    },

    computed: {
        ...mapGetters('pg', ['showBidModal']),
    },

    created() {
        this.countdown = setInterval(() => {
            const difference = this.endDate - Date.now();
            if (difference < 0) {
                clearInterval(this.countdown);
                this.countdown = null;
                return;
            }

            this.days = Math.floor(difference / DAY);
            this.hours = Math.floor((difference % DAY) / HOUR);
            this.minutes = Math.floor((difference % HOUR) / MINUTE);
            this.seconds = Math.floor((difference % MINUTE) / SECOND);
        }, 1000);
    },
};
</script>

<style lang="scss">
@use "style";
</style>
