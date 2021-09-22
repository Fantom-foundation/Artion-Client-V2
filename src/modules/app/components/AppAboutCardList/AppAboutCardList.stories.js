import AppAboutCardList from '@/modules/app/components/AppAboutCardList/AppAboutCardList.vue';

export default {
    title: 'Components/AppAboutCardList',
    components: AppAboutCardList,
};

export const Default = () => ({
    components: { AppAboutCardList },
    //language=HTML
    template: `
        <div>
            <app-about-card-list />
        </div>
    `,
});
