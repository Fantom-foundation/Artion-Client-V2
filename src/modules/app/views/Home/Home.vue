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
import appConfig from '@/app.config.js';
import { advertisedCollection } from '@/modules/app/queries/advertised-collection.js';
import { getIPFSUrl } from '@/utils/url.js';
import { i18n } from '@/plugins/vue-i18n.js';

export default {
    name: 'Home',

    components: { AppFooter, AppSectionCategory, AppSectionAbout, AppSectionNft },

    data() {
        return {
            nft: {},
        };
    },

    mounted() {
        this.setAdvertisedNFT();
    },

    methods: {
        async setAdvertisedNFT() {
            if (appConfig.flags.advertisedCollection) {
                const collection = await advertisedCollection();

                this.nft = {
                    title: collection.name,
                    collection: i18n.t('nftdetail.collection'),
                    img: getIPFSUrl(collection.image),
                    collectionContract: collection.contract,
                };
            } else {
                // TMP
                this.nft = { title: 'World of Umans', collection: 'Ancestral Uman', img: 'img/tmp/umans.png' };
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
