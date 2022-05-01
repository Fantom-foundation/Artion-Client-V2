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
});

export const Currencies = () => ({
    components: { APriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-price-field :currencies="currencies" />
        </div>
    `,
    data() {
        return {
            currencies: [
                {
                    address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
                    label: 'wFTM',
                    img: '/img/WFTM.png',
                    price: 2.23,
                    value: 'wftm',
                },
                {
                    address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
                    label: 'DAI',
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

export const Model = () => ({
    components: { APriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-price-field v-model="price" :currencies="currencies" />
            price: {{ price }} <br />
            <f-button secondary size="small" @click.native="price = 2">Set data</f-button>
        </div>
    `,
    data() {
        return {
            price: 1,
            currencies: [
                {
                    address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
                    label: 'wFTM',
                    img: '/img/WFTM.png',
                    price: 2.23,
                    value: 'wftm',
                },
                {
                    address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
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
