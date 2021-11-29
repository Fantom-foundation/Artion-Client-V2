import WrapStationForm from '@/modules/wallet/components/WrapStationForm/WrapStationForm.vue';

export default {
    title: 'Components/WrapStationForm',
    components: WrapStationForm,
};

export const Default = () => ({
    components: { WrapStationForm },
    //language=HTML
    template: `
        <div style="max-width: 600px">
            <wrap-station-form wallet-address="0x0F715e6B91dC24c09CfEDefcC04Cb7e9E5eF06B0" />
        </div>
    `,
});
