import AddCategory from '@/modules/collections/components/AddCategory/AddCategory.vue';

export default {
    title: 'Components/AddCategory',
    components: AddCategory,
};

export const Default = () => ({
    components: { AddCategory },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <add-category />
        </div>
    `,
    data() {
        return {};
    },
});
