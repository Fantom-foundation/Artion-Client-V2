<template>
    <a-window ref="window" v-bind="$attrs" :title="`Redeem ${token.name}`" class="fwindow-width-5">
        <p v-if="!shippingDetailsOK">
            Please fill out the form below, making sure the information you provide is accurate.
        </p>
        <p>
            Our team will be in touch with further details regarding the delivery of physical items and to schedule the
            meet and greet and VIP expreience.
        </p>
        <p>
            <b>Note: reedeeming the rewards will burn (destroy) the digital NFT.</b>
        </p>

        <div v-if="shippingDetailsOK" class="tea-right pab-4">
            <a-button
                label="Update Shipping Details"
                size="small"
                tertiary
                @click.native="onUpdateShippingButtonClick"
            />
        </div>

        <account-shipping-address-form
            use-user-profile-inputs
            required
            :disabled="shippingDetailsOK"
            @save-success="onSaveSuccess"
            @fields-not-ok="onFieldsNotOk"
        />

        <div v-if="shippingDetailsOK" class="pat-5">
            <f-option type="checkbox" option-size="small" v-model="terms">
                I understand that redeeming will burn and destroy the digital NFT
            </f-option>
            <div class="tea-center pat-5">
                <a-button label="Redeem" size="large" :disabled="!terms" @click.native="onRedeemButtonClick" />
            </div>
        </div>
    </a-window>
</template>

<script>
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import AccountShippingAddressForm from '@/modules/account/components/AccountShippingAddressForm/AccountShippingAddressForm.vue';
import AButton from '@/common/components/AButton/AButton.vue';

export default {
    name: 'NftRedeemWindow',

    components: { AButton, AccountShippingAddressForm },

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
            shippingDetailsOK: true,
            terms: false,
        };
    },

    methods: {
        ...copyMethods(AWindow, ['show', 'hide', 'toggle'], 'window'),

        onRedeemButtonClick() {
            if (this.terms) {
                alert('Not implemented yet');
            }
        },

        onUpdateShippingButtonClick() {
            this.shippingDetailsOK = false;
        },

        onSaveSuccess() {
            this.shippingDetailsOK = true;
        },

        onFieldsNotOk() {
            this.shippingDetailsOK = false;
        },
    },
};
</script>
