<template>
    <f-form class="nftmakeofferform" v-model="values" @submit="onSubmit">
        <f-form-input type="a-price-field" name="price" :label="$t('nftmakeofferform.price')" />
        <f-form-input type="date" name="expirattion" :label="$t('nftmakeofferform.offerExpiration')" />
        <div class="nftmakeofferform__btn">
            <f-button type="submit" size="large">{{ $t('nftmakeofferform.placeOffer') }}</f-button>
        </div>
    </f-form>
</template>
<script>
export default {
    name: 'NftMakeOfferForm',
    data() {
        return {
            values: {},
        };
    },
    methods: {
        onSubmit(_data) {
            console.log(_data);
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
