import UnderMaintenance from '@/modules/app/views/UnderMaintenance/UnderMaintenance.vue';

export default {
    title: 'Components/UnderMaintenance',
    components: UnderMaintenance,
};

export const Default = () => ({
    components: { UnderMaintenance },
    //language=HTML
    template: `
        <div>
            <under-maintenance />
        </div>
    `,
});
