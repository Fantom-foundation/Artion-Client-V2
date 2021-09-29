<template>
    <div class="appaboutcard">
        <div class="appaboutcard_item">
            <app-iconset :icon="info.icon" size="110px" original />
        </div>
        <div class="appaboutcard_item">
            <h3>{{ info.title }}</h3>
        </div>
        <div class="appaboutcard_item">
            <p>{{ info.text }}</p>
        </div>
    </div>
</template>

<script>
import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';
export default {
    name: 'AppAboutCard',
    components: { AppIconset },
    props: {
        info: {
            type: Object,
            default() {
                return {
                    icon: '',
                    title: '',
                    text: '',
                };
            },
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
