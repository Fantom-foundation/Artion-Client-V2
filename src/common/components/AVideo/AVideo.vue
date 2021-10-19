<template>
    <div class="avideo" :class="{ 'avideo-playing': playing }">
        <video ref="video" :preload="preload" :loop="loop" :src="src" :poster="poster" :autoplay="autoplay"></video>
        <button
            class="avideo_overlay btn-nostyle"
            :class="{ 'avideo_overlay-invisible': overlayInvisible }"
            :aria-label="buttonLabel"
            @click="onOverlayClick"
            @mousemove="_mousemoveCallback"
        >
            <app-iconset :icon="icon" class="avideo_icon" />
        </button>
    </div>
</template>

<script>
import { debounce } from 'fantom-vue-components/src/utils/function.js';

export default {
    name: 'AVideo',

    props: {
        /** Video source */
        src: {
            type: String,
            default: '',
            required: true,
        },
        /** Poster source */
        poster: {
            type: String,
            default: '',
        },
        /** Play in loop */
        loop: {
            type: Boolean,
            default: false,
        },
        /** Preload video */
        preload: {
            type: String,
            default: 'none',
        },
        /** Autoplay video */
        autoplay: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            playing: this.autoplay,
            overlayInvisible: false,
            mouseover: false,
        };
    },

    computed: {
        icon() {
            return this.playing ? 'pause' : 'play';
        },

        buttonLabel() {
            return this.playing ? this.$t('avideo.pause') : this.$t('avideo.play');
        },
    },

    created() {
        this._mousemoveCallback = debounce(event => this.onOverlayMousemove(event), 600, true, true);
    },

    methods: {
        play() {
            if (!this.playing) {
                this.$refs.video.play();

                setTimeout(() => {
                    this.overlayInvisible = true;
                    this.playing = true;
                }, 200);
            }
        },

        pause() {
            if (this.playing) {
                this.$refs.video.pause();
                this.playing = false;
            }
        },

        toggle() {
            if (!this.playing) {
                this.play();
            } else {
                this.pause();
            }
        },

        onOverlayClick() {
            this.toggle();
        },

        onOverlayMousemove() {
            this.mouseover = !this.mouseover;

            if (this.playing) {
                this.overlayInvisible = !this.mouseover;
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
