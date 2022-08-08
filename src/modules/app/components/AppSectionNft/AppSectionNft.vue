<template>
    <section class="appsectionnft container">
        <div class="appsectionnft_col">
            <h1 data-focus>{{ $t('appsectionnft.title') }}</h1>
            <p class="appsectionnft_text">{{ $t('appsectionnft.text') }}</p>
            <div class="appsectionnft_links">
                <router-link :to="{ name: 'explore' }" class="btn btn-lg" :aria-label="$t('page.explore.title')">
                    {{ $t('explore') }}
                </router-link>
                <router-link
                    :to="{ name: 'nft-create' }"
                    class="btn btn-lg btn-secondary"
                    :aria-label="$t('page.nftCreate.title')"
                >
                    {{ $t('create') }}
                </router-link>
            </div>
        </div>
        <div class="appsectionnft_col">
            <router-link
                v-if="nft.collectionContract"
                :to="{ name: 'explore', query: { collections: nft.collectionContract } }"
            >
                <app-section-nft-card :nft="nft" />
            </router-link>
            <app-section-nft-card v-else :nft="nft" />
        </div>
    </section>
</template>

<script>
import AppSectionNftCard from '@/modules/app/components/AppSectionNftCard/AppSectionNftCard.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

export default {
    name: 'AppSectionNft',

    components: { AppSectionNftCard },

    props: {
        nft: {
            type: Object,
            default() {
                return {
                    title: '',
                    collection: '',
                    img: '',
                };
            },
        },
    },

    mounted() {
        focusElem(this.$el);
    },
};
</script>

<style lang="scss">
@use "style";
</style>
