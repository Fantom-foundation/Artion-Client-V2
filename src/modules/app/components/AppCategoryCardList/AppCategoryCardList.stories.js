import AppCategoryCardList from '@/modules/app/components/AppCategoryCardList/AppCategoryCardList.vue';

export default {
    title: 'Components/AppCategoryCardList',
    components: AppCategoryCardList,
};

export const Default = () => ({
    components: { AppCategoryCardList },
    //language=HTML
    template: `
        <div>
            <app-category-card-list />
        </div>
    `,
});
