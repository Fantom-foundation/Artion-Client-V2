import APriceField from '@/common/components/APriceField/APriceField.vue';

export default {
    title: 'Components/APriceField',
    components: APriceField,
};

export const Default = () => ({
    components: { APriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-price-field />
        </div>
    `,
    data() {
        return {
            items: [
                { value: 'WFTM', label: 'WFTM', img: '/img/tmp/ftm.png' },
                { value: 'WFTM', label: 'WFTM', img: '/img/tmp/ftm.png' },
                { value: 'WFTM', label: 'WFTM', img: '/img/tmp/ftm.png' },
                { value: 'WFTM', label: 'WFTM', img: '/img/tmp/ftm.png' },
            ],
        };
    },
});
