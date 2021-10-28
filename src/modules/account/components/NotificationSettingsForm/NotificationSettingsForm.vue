<template>
    <f-form v-model="values" class="notificationsettingsform" @submit="onFormSubmit">
        <div class="notificationsettingsform_list">
            <div class="notificationsettingsform_item">
                <div class="notificationsettingsform_checkbox">
                    <f-form-input name="sold1" type="checkbox" />
                </div>
                <div class="notificationsettingsform_content">
                    <div class="notificationsettingsform_title">Item Sold</div>
                    <div class="notificationsettingsform_desc">When someone purchased one of your items</div>
                </div>
            </div>
            <div class="notificationsettingsform_item">
                <div class="notificationsettingsform_checkbox">
                    <f-form-input name="sold2" type="checkbox" />
                </div>
                <div class="notificationsettingsform_content">
                    <div class="notificationsettingsform_title">Item Sold</div>
                    <div class="notificationsettingsform_desc">When someone purchased one of your items</div>
                </div>
            </div>
            <div class="notificationsettingsform_item">
                <div class="notificationsettingsform_checkbox">
                    <f-form-input name="sold3" type="checkbox" />
                </div>
                <div class="notificationsettingsform_content">
                    <div class="notificationsettingsform_title">Item Sold</div>
                    <div class="notificationsettingsform_desc">When someone purchased one of your items</div>
                </div>
            </div>
            <div class="notificationsettingsform_item">
                <div class="notificationsettingsform_checkbox">
                    <f-form-input name="sold4" type="checkbox" />
                </div>
                <div class="notificationsettingsform_content">
                    <div class="notificationsettingsform_title">Item Sold</div>
                    <div class="notificationsettingsform_desc">When someone purchased one of your items</div>
                </div>
            </div>
            <div class="notificationsettingsform_item">
                <div class="notificationsettingsform_checkbox">
                    <f-form-input name="sold5" type="checkbox" />
                </div>
                <div class="notificationsettingsform_content">
                    <div class="notificationsettingsform_title">Item Sold</div>
                    <div class="notificationsettingsform_desc">When someone purchased one of your items</div>
                </div>
            </div>
        </div>

        <div class="notificationsettingsform_price">
            <div class="notificationsettingsform_price_title">{{ $t('notificationsettingsform.minimumBid') }}</div>
            <div class="notificationsettingsform_price_desc">
                {{ $t('notificationsettingsform.recieveWhenPriceEqualOrGreater') }}
            </div>
            <f-form-input
                type="a-price-field"
                :currencies="payTokens"
                :validator="priceValidator"
                validate-on-input
                name="price"
            />
        </div>
        <div class="notificationsettingsform_btn">
            <f-button type="submit">Save</f-button>
        </div>
    </f-form>
</template>
<script>
import { PAY_TOKENS_WITH_PRICES } from '@/common/constants/pay-tokens.js';
export default {
    name: 'NotificationSettingsForm',

    data() {
        return {
            values: {},
            payTokens: [],
        };
    },

    created() {
        this.init();
    },

    methods: {
        async init() {
            this.payTokens = await PAY_TOKENS_WITH_PRICES();
        },

        priceValidator(value) {
            const val = parseFloat(value);

            if (isNaN(val) || val <= 0) {
                return this.$t('nftmakeofferform.nonZeroPrice');
            } else if (this.accountBalance < val) {
                return this.$t('nftmakeofferform.insufficientBalance');
            }

            return '';
        },

        onFormSubmit(_data) {
            console.log(_data);
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
