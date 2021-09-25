<template>
    <section class="appsectionnft container">
        <div class="appsectionnft_col">
            <h1>{{ $t('appsectionnft.title') }}</h1>
            <p class="appsectionnft_text">{{ $t('appsectionnft.text') }}</p>
            <div class="appsectionnft_links">
                <router-link :to="{ name: 'explore' }" class="btn btn-lg">{{ $t('explore') }}</router-link>
                <router-link :to="{ name: 'collection-create' }" class="btn btn-lg btn-secondary">
                    {{ $t('create') }}
                </router-link>
            </div>
        </div>
        <div class="appsectionnft_col">
            <app-section-nft-card :nft="nft" />
        </div>
    </section>
</template>

<script>
import AppSectionNftCard from '@/modules/app/components/AppSectionNftCard/AppSectionNftCard.vue';
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
};
</script>

<style lang="scss">
@use "style";
</style>
