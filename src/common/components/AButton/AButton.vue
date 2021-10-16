<template>
	<f-button v-bind="$attrs" v-on="$listeners" :class="{ 'btn-loading': loading }">
		<span v-if="loading" class="fbutton_spinner">
			<div class="spin"></div>
		</span>
		<span class="fbutton_content"><slot /></span>
	</f-button>
</template>
<script>
export default {
	name: 'AButton',
	props: {
		loading: {
			type: Boolean,
			default: false,
		}
	}
}
</script>
<style lang="scss">
@use 'style';
</style>