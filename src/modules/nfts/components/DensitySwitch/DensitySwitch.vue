<template>
	<div class="density">
		<f-button :aria-label="$t('densityswitch.largeDisplay')" :data-tooltip="$t('densityswitch.largeDisplay')" ref="bigGridButton" density="280" @click.native="onDensitySwitchClick">
			<app-iconset icon="solid2" size="24px" />
		</f-button>
		<f-button :aria-label="$t('densityswitch.smallDisplay')" :data-tooltip="$t('densityswitch.smallDisplay')" density="200" @click.native="onDensitySwitchClick">
			<app-iconset icon="solid1" size="24px" />
		</f-button>
	</div>
</template>
<script>
import AppIconset from "@/modules/app/components/AppIconset/AppIconset.vue";
export default {
	name: 'DensitySwitch',
	components: { AppIconset },
	data() {
		return {
			densityBig: true,
		}
	},

	mounted(){
		this.$refs.bigGridButton.$el.click();
	},

	methods: {
		onDensitySwitchClick(e){
			this.$emit('density-switch', e.currentTarget.getAttribute('density'))
		}
	}
}
</script>
<style lang="scss">
@use 'style';
</style>