//https://media.w3.org/2010/05/sintel/trailer.mp4
import AVideo from '@/common/components/AVideo/AVideo.vue';

export default {
    title: 'Components/AVideo',
    components: AVideo,
};

export const Default = () => ({
    components: { AVideo },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-video src="https://media.w3.org/2010/05/sintel/trailer.mp4" />
        </div>
    `,
});

export const Poster = () => ({
    components: { AVideo },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-video poster="img/tmp/poster.jpg" src="https://media.w3.org/2010/05/sintel/trailer.mp4" />
        </div>
    `,
});

export const Loop = () => ({
    components: { AVideo },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-video loop poster="img/tmp/poster.jpg" src="https://media.w3.org/2010/05/sintel/trailer.mp4" />
        </div>
    `,
});

export const Style = () => ({
    components: { AVideo },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-video style="--avideo-background: #111; --avideo-icon-size: 32px; --avideo-icon-color: orange;" src="https://media.w3.org/2010/05/sintel/trailer.mp4" />
        </div>
    `,
});
