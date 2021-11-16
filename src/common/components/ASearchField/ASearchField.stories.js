import ASearchField from '@/common/components/ASearchField/ASearchField.vue';

export default {
    title: 'Components/ASearchField',
    components: ASearchField,
};

export const Default = () => ({
    components: { ASearchField },
    //language=HTML
    template: `
        <div>
            <a-search-field field-size="large" />
        </div>
    `,
});

export const Loading = () => ({
    components: { ASearchField },
    //language=HTML
    template: `
        <div>
            <a-search-field loading field-size="large" />
        </div>
    `,
});
