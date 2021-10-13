<template>
    <f-form class="nftmakeofferform" v-model="values" @submit="onSubmit">
        <f-form-input type="a-price-field" name="price" :label="$t('nftmakeofferform.price')" />
        <f-form-input type="date" name="expirattion" :label="$t('nftmakeofferform.offerExpiration')" />
        <div class="nftmakeofferform__btn">
            <f-button type="submit" size="large">{{ $t('nftmakeofferform.placeOffer') }}</f-button>
        </div>

        <a-sign-transaction :tx="tx" />
    </f-form>
</template>
<script>
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils.js';
import { bToWei } from '@/utils/big-number.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';

export default {
    name: 'NftMakeOfferForm',

    components: { ASignTransaction },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            values: {},
            tx: {},
        };
    },

    methods: {
        async tmp(values) {
            const web3 = new Web3();
            const { token } = this;

            console.log(JSON.stringify(values));

            const tx = contracts.createOffer(
                token.contract,
                token.tokenId,
                '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', // WFTM
                1,
                bToWei(1, 18),
                1634043200,
                web3
            );

            tx.from = this.$wallet.account;

            console.log(JSON.stringify(tx));
            console.log('token: ', JSON.stringify(token));

            this.tx = tx;
        },

        onSubmit(_data) {
            this.tmp(_data.values);
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
