<template>
    <div class="home">
        <app-section-nft :nft="nft" />

        <div class="home_shadow">
            <app-section-about />
            <app-section-category />
        </div>

        <app-footer />
    </div>
</template>

<script>
import AppSectionNft from '@/modules/app/components/AppSectionNft/AppSectionNft.vue';
import AppSectionAbout from '@/modules/app/components/AppSectionAbout/AppSectionAbout.vue';
import AppSectionCategory from '@/modules/app/components/AppSectionCategories/AppSectionCategories.vue';
import AppFooter from '@/modules/app/components/AppFooter/AppFooter.vue';

export default {
    name: 'Home',

    components: { AppFooter, AppSectionCategory, AppSectionAbout, AppSectionNft },

    data() {
        return {
            nft: {},
        };
    },

    mounted() {
        // TMP
        this.nft = { title: 'World of Umans', collection: 'Ancestral Uman', img: 'img/tmp/umans.png' };
    },
};
</script>

<style lang="scss">
@use "style";
</style>
