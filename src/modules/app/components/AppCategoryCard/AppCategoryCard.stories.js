import AppCategoryCard from '@/modules/app/components/AppCategoryCard/AppCategoryCard.vue';

export default {
    title: 'Components/AppCategoryCard',
    components: AppCategoryCard,
};

export const Default = () => ({
    components: { AppCategoryCard },
    //language=HTML
    template: `
        <div>
            <app-category-card no-category />
        </div>
    `,
});
