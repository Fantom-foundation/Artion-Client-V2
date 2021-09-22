import AppSearchBar from '@/modules/app/components/AppSearchBar/AppSearchBar.vue';

export default {
    title: 'Components/AppSearchBar',
    components: AppSearchBar,
};

export const Default = () => ({
    components: { AppSearchBar },
    //language=HTML
    template: `
        <div>
            <app-search-bar />
        </div>
    `,
    data() {
        return {};
    },
});
