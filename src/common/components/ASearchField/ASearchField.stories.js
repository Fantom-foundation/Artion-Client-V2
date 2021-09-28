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
            <a-search-field />
        </div>
    `,
});
