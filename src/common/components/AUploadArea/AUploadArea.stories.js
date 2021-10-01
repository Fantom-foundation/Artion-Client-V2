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
