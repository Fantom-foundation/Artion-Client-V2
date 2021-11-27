import ABPriceField from '@/common/components/ABPriceField/ABPriceField.vue';

export default {
    title: 'Components/ABPriceField',
    components: ABPriceField,
};

export const Default = () => ({
    components: { ABPriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-b-price-field />
        </div>
    `,
});

export const Token = () => ({
    components: { ABPriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-b-price-field :token="token" field-size="large" />
        </div>
    `,
    data() {
        return {
            token: {
                decimals: 18,
                price: '0x20e9a8',
                priceDecimals: 6,
                label: 'wFTM',
            },
        };
    },
});

export const Balance = () => ({
    components: { ABPriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-b-price-field balance="0x2dbcce4a821dcf3f" :token="token" field-size="large" />
        </div>
    `,
    data() {
        return {
            token: {
                decimals: 18,
                price: '0x20e9a8',
                priceDecimals: 6,
                label: 'wFTM',
            },
        };
    },
});

export const Validate = () => ({
    components: { ABPriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-b-price-field validate balance="0x2dbcce4a821dcf3f" :token="token" field-size="large" />
        </div>
    `,
    data() {
        return {
            token: {
                decimals: 18,
                price: '0x20e9a8',
                priceDecimals: 6,
                label: 'wFTM',
            },
        };
    },
});

export const MaxBalance = () => ({
    components: { ABPriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-b-price-field max-balance="0x2D88EFAB1C654F3F" validate balance="0x2dbcce4a821dcf3f" :token="token" field-size="large" />
        </div>
    `,
    data() {
        return {
            token: {
                decimals: 18,
                price: '0x20e9a8',
                priceDecimals: 6,
                label: 'wFTM',
            },
        };
    },
});

export const Value = () => ({
    components: { ABPriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-b-price-field :value="5" validate max-balance="0x2D88EFAB1C654F3F" balance="0x2dbcce4a821dcf3f" :token="token" field-size="large" />
        </div>
    `,
    data() {
        return {
            token: {
                decimals: 18,
                price: '0x20e9a8',
                priceDecimals: 6,
                label: 'wFTM',
            },
        };
    },
});

export const Label = () => ({
    components: { ABPriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-b-price-field label="From" validate max-balance="0x2D88EFAB1C654F3F" balance="0x2dbcce4a821dcf3f" :token="token" field-size="large" />
        </div>
    `,
    data() {
        return {
            token: {
                decimals: 18,
                price: '0x20e9a8',
                priceDecimals: 6,
                label: 'wFTM',
            },
        };
    },
});

export const OnInput = () => ({
    components: { ABPriceField },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <a-b-price-field @input="onInput" validate max-balance="0x2D88EFAB1C654F3F" balance="0x2dbcce4a821dcf3f" :token="token" field-size="large" />
            <br />
            <pre class="fos-3">{{ data }}</pre>
        </div>
    `,
    data() {
        return {
            token: {
                decimals: 18,
                price: '0x20e9a8',
                priceDecimals: 6,
                label: 'wFTM',
            },
            data: {},
        };
    },
    methods: {
        onInput(data) {
            this.data = data;
        },
    },
});
