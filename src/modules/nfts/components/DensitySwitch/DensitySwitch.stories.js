import DensitySwitch from '@/modules/nfts/components/DensitySwitch/DensitySwitch.vue';

export default {
    title: 'Components/DensitySwitch',
    components: DensitySwitch,
};

export const Default = () => ({
    components: { DensitySwitch },
    //language=HTML
    template: `
        <div>
            <density-switch @density-switch="density = $event" />
				<div>Density: {{ density }}</div>
        </div>
    `,

    data() {
        return {
            density: 280,
        };
    },
});
