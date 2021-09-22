import AppSectionAbout from '@/modules/app/components/AppSectionAbout/AppSectionAbout.vue';

export default {
    title: 'Components/AppSectionAbout',
    components: AppSectionAbout,
};

export const Default = () => ({
    components: { AppSectionAbout },
    //language=HTML
    template: `
        <div>
            <app-section-about />
        </div>
    `,
    data() {
        return {};
    },
});
