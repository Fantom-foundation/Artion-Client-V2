import AShareButton from '@/common/components/AShareButton/AShareButton.vue';

export default {
    title: 'Components/AShareButton',
    components: AShareButton,
};

export const Default = () => ({
    components: { AShareButton },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-share-button />
        </div>
    `,
    data() {
        return {};
    },
});
