<template>
    <div class="pg-bid-form">
        <div class="pg-bid-form__current-bid">{{ $t('pgBidForm.currentBid') }}: 15,000 FTM</div>
        <div class="pg-bid-form__my-bid">
            <a-currency-dropdown></a-currency-dropdown>
            <input
                class="pg-bid-form__amount"
                :class="{ 'pg-bid-form__amount--zero': !formData.amount }"
                type="text"
                v-model="formData.amount"
            />
        </div>
        <div class="pg-bid-form__info">
            <div class="pg-bid-form__balance">
                <span class="pg-bid-form__balance-text"> {{ $t('pgBidForm.balance') }}: </span>15,326.16 FTM
            </div>
            <div class="pg-bid-form__bid-value-fiat">
                ~$0
            </div>
        </div>
        <div class="pg-bid-form__terms-and-conditions">
            <f-option type="checkbox" option-size="small" name="terms" @change="termAndConditionsAgreed = $event">
                <label>
                    {{ $t('pgBidForm.termsAndConditionsAgreement') }}
                    <router-link :to="{ path: '/pg' }">{{ $t('pgBidForm.termsAndConditionsLink') }}</router-link>
                </label>
            </f-option>
        </div>
        <div class="flex juc-center">
            <span v-if="true" class="pg-bid-form__button" @click="placeBid">
                <f-button size="large" :label="$t('pgBidForm.placeBid')" />
            </span>
        </div>
    </div>
</template>

<script>
// import PGCurrencyDropdown from '../PGCurrencyDropdown/PGCurrencyDropdown';
import ACurrencyDropdown from '../../../../common/components/ACurrencyDropdown/ACurrencyDropdown';

export default {
    name: 'PGBidForm',

    components: {
        ACurrencyDropdown,
    },

    data() {
        return {
            formData: {
                token: null,
                amount: 0.0,
            },
            termAndConditionsAgreed: false,
        };
    },

    methods: {
        placeBid() {
            if (!this.validate()) {
                return;
            }
            console.log('Place Bid');
        },

        validate() {
            console.log('Validate');
            return true;
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
