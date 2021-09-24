<template>
    <div class="appaboutcardlist">
        <app-about-card v-for="(item, index) in cardItems" :key="index" :info="item" />
    </div>
</template>

<script>
import AppAboutCard from '@/modules/app/components/AppAboutCard/AppAboutCard';

export default {
    name: 'AppAboutCardList',
    components: { AppAboutCard },
    data() {
        return {
            cardItems: [
                {
                    icon: 'card1',
                    title: this.$t('appsectionabout.card1.title'),
                    text: this.$t('appsectionabout.card1.text'),
                },
                {
                    icon: 'card2',
                    title: this.$t('appsectionabout.card2.title'),
                    text: this.$t('appsectionabout.card2.text'),
                },
                {
                    icon: 'card3',
                    title: this.$t('appsectionabout.card3.title'),
                    text: this.$t('appsectionabout.card3.text'),
                },
                {
                    icon: 'card4',
                    title: this.$t('appsectionabout.card4.title'),
                    text: this.$t('appsectionabout.card4.text'),
                },
            ],
        };
    },
};
</script>

<style lang="scss">
@use "style";
</style>
