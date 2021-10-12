<template>
    <div class="pg-nft-card">
        <div class="pg-nft-card__img-cont">
            <img src="img/tmp/pg.jpeg" alt="" class="pg-nft-card__img-el" />
        </div>
        <div class="pg-nft-card__cta">
            <div class="pg-nft-card__cta-top">
                <div class="pg-nft-card__bid">
                    <h6 class="h6">Current Bid</h6>

                    <template v-if="true">
                        <h4 class="h4">15,000 FTM</h4>
                        <p class="pg-nft-card__note">$28,671.45</p>
                    </template>

                    <h4 v-else class="h4">no bids</h4>
                </div>
                <div class="pg-nft-card__v-separator"></div>
                <div class="pg-nft-card__countdown">
                    <h6 class="h6">Auction Ending in</h6>
                    <div v-if="countdown" class="pg-nft-card__countdown-time">
                        <div>
                            <h4 class="h4 pg-nft-card__countdown-number">{{ days }}</h4>
                            <div class="pg-nft-card__note">days</div>
                        </div>
                        <div>
                            <h4 class="h4 pg-nft-card__countdown-number">{{ hours }}</h4>
                            <div class="pg-nft-card__note">hours</div>
                        </div>
                        <div>
                            <h4 class="h4 pg-nft-card__countdown-number">{{ minutes }}</h4>
                            <div class="pg-nft-card__note">minutes</div>
                        </div>
                        <div>
                            <h4 class="h4 pg-nft-card__countdown-number">{{ seconds }}</h4>
                            <div class="pg-nft-card__note">seconds</div>
                        </div>
                    </div>

                    <h4 v-else class="h4">Auction has ended</h4>
                </div>
            </div>

            <div class="pg-nft-card__address" :class="{ 'pg-nft-card__address--empty': !address }">{{ address }}</div>

            <div class="pg-nft-card__cta-bottom">
                <span v-if="true" class="pg-nft-card__button">
                    <f-button size="large" label="Place a bid" />
                </span>
                <template v-else>
                    <wallet-button />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import WalletButton from '../../../wallet/components/WalletButton/WalletButton';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default {
    name: 'PGNftCard',

    components: {
        WalletButton,
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
        };
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
