<template>
    <div class="accountavatar" :class="{ 'accountavatar-imgloaded': !imgLoading }">
        <a-placeholder :content-loaded="cLoaded" />
        <img :src="imgSrc" alt="avatar" @load="onImgLoad" @error="onImgError" />
    </div>
</template>

<script>
export default {
    name: 'AccountAvatar',

    props: {
        /** Image src */
        src: {
            type: String,
            default: '',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        cLoaded() {
            return !this.loading && !!this.imgSrc && !this.imgLoading;
        },
    },

    data() {
        return {
            imgLoading: false,
            imgSrc: '',
        };
    },

    watch: {
        src(value) {
            this.imgSrc = value;
        },
        /*
        src: {
            handler(value) {
                this.imgSrc = value;
            },
            immediate: true,
        },
*/
    },

    mounted() {
        this.$nextTick(() => {
            this.imgSrc = this.src;
        });
    },

    methods: {
        onImgLoad() {
            this.imgLoading = false;
            console.log('!!!!!!!!!!!!');
        },

        onImgError() {
            this.imgLoading = false;
            console.log('!!!!!!!!!!!!#EEE');
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
