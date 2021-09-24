import AppAboutCard from '@/modules/app/components/AppAboutCard/AppAboutCard.vue';

export default {
    title: 'Components/AppAboutCard',
    components: AppAboutCard,
};

export const Default = () => ({
    components: { AppAboutCard },
    //language=HTML
    data: () => ({
        item: {
            icon: 'card3',
            title: 'title',
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec ante efficitur, tincidunt turpis eu, ultricies sapien. Cras eu neque nec leo luctus pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
    }),
    template: `
        <div>
            <app-about-card :info="item"/>
        </div>
    `,
});
