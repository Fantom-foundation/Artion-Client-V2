import AppAboutCard from '@/modules/app/components/AppAboutCard/AppAboutCard.vue';

export default {
    title: 'Components/AppAboutCard',
    components: AppAboutCard,
};

export const Default = () => ({
    components: { AppAboutCard },
    //language=HTML
    template: `
        <div>
            <app-about-card />
        </div>
    `,
});
