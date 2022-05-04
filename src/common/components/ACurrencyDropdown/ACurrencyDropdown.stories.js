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
            <a-currency-dropdown />
        </div>
    `,
});

export const Currencies = () => ({
    components: { ACurrencyDropdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-currency-dropdown :currencies="currencies" />
        </div>
    `,
    data() {
        return {
            currencies: [
                {
                    address: '0x05885C6Bbc268D54950D7200c513EeBa29302fA8',
                    label: 'wFTM',
                    img: '/img/WFTM.png',
                    price: 2.23,
                    value: 'wftm',
                },
                {
                    address: '0x05885C6Bbc268D54950D7200c513EeBa29302fA8',
                    label: 'YANA',
                    img: '',
                    price: 1,
                    value: 'day',
                },
                {
                    address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
                    label: 'USDC',
                    img: '',
                    price: 1,
                    value: 'usdc',
                },
            ],
        };
    },
});

export const TokenSelected = () => ({
    components: { ACurrencyDropdown },
    //language=HTML
    template: `
        <div style="max-width: 400px">
            <a-currency-dropdown :currencies="currencies" @token-selected="onTokenSelected" />
            {{ token }}
        </div>
    `,
    data() {
        return {
            currencies: [
                {
                    address: '0x05885C6Bbc268D54950D7200c513EeBa29302fA8',
                    label: 'wFTM',
                    img: '/img/WFTM.png',
                    price: 2.23,
                    value: 'wftm',
                },
                {
                    address: '0x05885C6Bbc268D54950D7200c513EeBa29302fA8',
                    label: 'YANA',
                    img: '',
                    price: 1,
                    value: 'day',
                },
                {
                    address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
                    label: 'USDC',
                    img: '',
                    price: 1,
                    value: 'usdc',
                },
            ],
            token: null,
        };
    },
    methods: {
        onTokenSelected(item) {
            this.token = item;
        },
    },
});
