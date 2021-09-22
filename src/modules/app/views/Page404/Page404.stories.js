import Page404 from '@/modules/app/views/Page404/Page404.vue';

export default {
    title: 'Components/Page404',
    components: Page404,
};

export const Default = () => ({
    components: { Page404 },
    //language=HTML
    template: `
        <div>
            <page404 />
        </div>
    `,
});
