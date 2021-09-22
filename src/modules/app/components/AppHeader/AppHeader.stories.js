import AppHeader from '@/modules/app/components/AppHeader/AppHeader.vue';

export default {
    title: 'Components/AppHeader',
    components: AppHeader,
};

export const Default = () => ({
    components: { AppHeader },
    //language=HTML
    template: `
        <div>
            <app-header />
        </div>
    `,
    data() {
        return {};
    },
});
