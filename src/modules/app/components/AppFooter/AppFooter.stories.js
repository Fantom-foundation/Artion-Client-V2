import AppFooter from '@/modules/app/components/AppFooter/AppFooter.vue';

export default {
    title: 'Components/AppFooter',
    components: AppFooter,
};

export const Default = () => ({
    components: { AppFooter },
    //language=HTML
    template: `
        <div>
            <app-footer />
        </div>
    `,
});
