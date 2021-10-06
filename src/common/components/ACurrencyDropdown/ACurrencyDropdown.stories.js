import ACurrencyDropdown from '@/common/components/ACurrencyDropdown/ACurrencyDropdown.vue';

export default {
    title: 'Components/ACurrencyDropdown',
    components: ACurrencyDropdown,
};

export const Default = () => ({
    components: { ACurrencyDropdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-currency-dropdown :currencies="items"/>
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
