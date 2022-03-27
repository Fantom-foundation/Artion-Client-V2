<template>
    <p class="social-links">
        <a v-if="info.site" :href="info.site" target="_blank" rel="noopener">
            <app-iconset icon="web" />
        </a>
        <a v-if="info.twitter" :href="info.twitter" target="_blank" rel="noopener">
            <app-iconset icon="twitter-grey" />
        </a>
        <a v-if="info.telegram" :href="info.telegram" target="_blank" rel="noopener">
            <app-iconset icon="telegram" />
        </a>
        <a v-if="info.discord" :href="info.discord" target="_blank" rel="noopener">
            <app-iconset icon="discord" />
        </a>
        <a v-if="info.medium" :href="info.medium" target="_blank" rel="noopener">
            <app-iconset icon="medium" />
        </a>
        <a v-if="info.instagram" :href="info.instagram" target="_blank" rel="noopener">
            <app-iconset icon="instagram" />
        </a>
    </p>
</template>

<script>
export default {
    name: 'SocialLinks',

    props: {
        info: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
