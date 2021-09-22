import AppSectionCategories from '@/modules/app/components/AppSectionCategories/AppSectionCategories.vue';

export default {
    title: 'Components/AppSectionCategories',
    components: AppSectionCategories,
};

export const Default = () => ({
    components: { AppSectionCategories },
    //language=HTML
    template: `
        <div>
            <app-section-categories />
        </div>
    `,
    data() {
        return {};
    },
});
