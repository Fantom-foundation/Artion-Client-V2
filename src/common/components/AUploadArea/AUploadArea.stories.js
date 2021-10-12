import AUploadArea from '@/common/components/AUploadArea/AUploadArea.vue';

export default {
    title: 'Components/AUploadArea',
    components: AUploadArea,
};

export const Default = () => ({
    components: { AUploadArea },
    //language=HTML
    template: `
        <div style="max-width: 400px;height: 400px;">
            <a-upload-area />
        </div>
    `,
});

export const Slot = () => ({
    components: { AUploadArea },
    //language=HTML
    template: `
        <div style="max-width: 400px;height: 400px;">
            <a-upload-area>
            Drop files here or browse <br />
            JPG, PNG, BMP, GIF Max 15mb.
            </a-upload-area>
        </div>
    `,
});
