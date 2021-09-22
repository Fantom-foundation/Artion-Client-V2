<template>
    <div class="home">
        <app-section-nft :nft="nft" />

        <div class="home_shadow">
            <app-section-about />
            <app-section-category />
        </div>

        <!-- TMP -->
        <!--        <ul>
            <li><router-link :to="{ name: 'explore' }">Explore</router-link></li>
            <li><router-link :to="{ name: 'account' }">Account</router-link></li>
            <li><router-link :to="{ name: 'collection' }">Collection</router-link></li>
        </ul>-->
    </div>
</template>

<script>
import AppSectionNft from '@/modules/app/components/AppSectionNft/AppSectionNft.vue';
import AppSectionAbout from '@/modules/app/components/AppSectionAbout/AppSectionAbout.vue';
import AppSectionCategory from '@/modules/app/components/AppSectionCategories/AppSectionCategories.vue';

export default {
    name: 'Home',

    components: { AppSectionCategory, AppSectionAbout, AppSectionNft },

    data() {
        return {
            nft: {},
        };
    },

    mounted() {
        // TMP
        // this.nft = { title: 'World of Umans', collection: 'Ancestral Uman', img: 'img/tmp/umans.png' };
        setTimeout(() => {
            this.nft = { title: 'World of Umans', collection: 'Ancestral Uman', img: 'img/tmp/umans.png' };
        }, 700);
    },
};
</script>

<style lang="scss">
@use "style";
</style>
