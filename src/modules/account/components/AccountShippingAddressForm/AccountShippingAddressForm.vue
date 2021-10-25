<template>
    <f-form v-model="values" @submit="onSubmit" class="accountshippingaddressform">
        <div v-show="disabled" class="grid">
            <template v-if="useUserProfileInputs">
                <span class="flabel col-5">{{ $t('accountprofileform.email') }}</span>
                <span class="col-7">{{ values.email }}</span>
            </template>

            <span class="flabel col-5">{{ $t('accountprofileform.fullname') }}</span>
            <span class="col-7">{{ values.fullname }}</span>

            <span class="flabel col-5">{{ $t('accountprofileform.phone') }}</span>
            <span class="col-7">{{ values.phone }}</span>

            <span class="flabel col-5">{{ $t('accountprofileform.street') }}</span>
            <span class="col-7">{{ values.street }}</span>

            <span class="flabel col-5">{{ $t('accountprofileform.apartment') }}</span>
            <span class="col-7">{{ values.apartment }}</span>

            <span class="flabel col-5">{{ $t('accountprofileform.city') }}</span>
            <span class="col-7">{{ values.city }}</span>

            <span class="flabel col-5">{{ $t('accountprofileform.country') }}</span>
            <span class="col-7">{{ values.country }}</span>

            <span class="flabel col-5">{{ $t('accountprofileform.state') }}</span>
            <span class="col-7">{{ values.state }}</span>

            <span class="flabel col-5">{{ $t('accountprofileform.zip') }}</span>
            <span class="col-7">{{ values.zip }}</span>
        </div>

        <div v-show="!disabled" class="grid">
            <template v-if="useUserProfileInputs">
                <f-form-input
                    type="email"
                    field-size="large"
                    name="email"
                    :label="$t('accountprofileform.email')"
                    :required="isRequired('email')"
                    validate-on-input
                />
            </template>

            <f-form-input
                type="text"
                field-size="large"
                name="fullname"
                :label="$t('accountshippingaddressform.fullname')"
                :required="isRequired('fullname')"
                validate-on-input
            />
            <f-form-input
                type="text"
                field-size="large"
                name="phone"
                :label="$t('accountshippingaddressform.phone')"
                :required="isRequired('phone')"
                validate-on-input
            />
            <f-form-input
                type="text"
                field-size="large"
                name="street"
                :label="$t('accountshippingaddressform.street')"
                class="md:col-6"
                :required="isRequired('street')"
                validate-on-input
            />
            <f-form-input
                type="text"
                field-size="large"
                name="apartment"
                :label="$t('accountshippingaddressform.apartment')"
                class="md:col-6"
                :required="isRequired('apartment')"
                validate-on-input
            />
            <f-form-input
                type="text"
                field-size="large"
                name="city"
                :label="$t('accountshippingaddressform.city')"
                :required="isRequired('city')"
                validate-on-input
            />
            <f-form-input
                type="text"
                field-size="large"
                name="country"
                :label="$t('accountshippingaddressform.country')"
                class="md:col-4"
                :required="isRequired('country')"
                validate-on-input
            />
            <f-form-input
                type="text"
                field-size="large"
                name="state"
                :label="$t('accountshippingaddressform.state')"
                class="md:col-4"
                :required="isRequired('state')"
                validate-on-input
            />
            <f-form-input
                type="text"
                field-size="large"
                name="zip"
                :label="$t('accountshippingaddressform.zip')"
                class="md:col-4"
                :required="isRequired('zip')"
                validate-on-input
            />

            <slot></slot>

            <div class="tea-center pat-4">
                <a-button type="submit" size="large" :loading="saving">
                    {{ $t('accountshippingaddressform.save') }}
                </a-button>
            </div>
        </div>
    </f-form>
</template>

<script>
import { getUser } from '@/modules/account/queries/user.js';
import { getLoggedUserShippingAddress } from '@/modules/account/queries/logged-user-shipping-address.js';
import { mapState } from 'vuex';
import { updateUser } from '@/modules/account/mutations/update-user.js';
import { updateShippingAddress } from '@/modules/account/mutations/update-shipping-address.js';
import AButton from '@/common/components/AButton/AButton.vue';

export default {
    name: 'AccountShippingAddressForm',

    components: { AButton },

    props: {
        /** Some of the inputs will be required */
        required: {
            type: Boolean,
            default: false,
        },
        /** Display non-editable variant of the form */
        disabled: {
            type: Boolean,
            default: false,
        },
        /** Use also inputs from user profile */
        useUserProfileInputs: {
            type: Boolean,
            default: false,
        },
        requiredFields: {
            type: Array,
            default() {
                return ['email', 'fullname', 'phone', 'street', 'city', 'state', 'country', 'zip'];
            },
        },
    },

    data() {
        return {
            values: {
                fullname: '',
                phone: '',
                street: '',
                apartment: '',
                city: '',
                state: '',
                country: '',
                zip: '',

                // user profile inputs
                email: '',
            },
            saving: false,
            dDisabled: this.disabled,
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        walletAddress: {
            async handler(value) {
                if (value) {
                    const shippingAddress = await getLoggedUserShippingAddress();
                    let user = {};

                    if (this.useUserProfileInputs) {
                        user = await getUser(value);
                    }

                    this.values = { ...shippingAddress, ...user };

                    this.checkRequiredFields(this.values);
                } else {
                    this.values = {};
                }
            },
            immediate: true,
        },

        /*disabled(value) {
            this.dDisabled = value;
            console.log('??', JSON.stringify(this.values));
        },*/
    },

    methods: {
        async save(values) {
            const {
                fullname,
                phone,
                street,
                apartment,
                city,
                state,
                country,
                zip,

                email,
            } = values;

            const promises = [
                updateShippingAddress({
                    fullname,
                    phone,
                    street,
                    apartment,
                    city,
                    state,
                    country,
                    zip,
                }),
            ];

            if (this.useUserProfileInputs) {
                const { username, bio } = this.values;

                promises.push(updateUser({ username, bio, email }));
            }

            this.saving = true;

            try {
                let result = await Promise.all(promises);

                this.saving = false;

                if (result[0] && (result.length === 2 ? result[1] : true)) {
                    this.$emit('save-success');

                    this.$notifications.add({
                        text: this.$t('accountshippingaddressform.savedSuccessfully'),
                        type: 'success',
                    });
                }
            } catch (error) {
                this.saving = false;
                console.error(error);
            }
        },

        isRequired(fieldName) {
            return this.required && this.requiredFields.includes(fieldName);
        },

        checkRequiredFields(values) {
            const { requiredFields } = this;
            let ok = true;
            let fieldName = '';

            for (let i = 0, len = requiredFields.length; i < len; i++) {
                fieldName = requiredFields[i];

                if (fieldName in values && !values[fieldName]) {
                    ok = false;
                    break;
                }
            }

            if (!ok) {
                this.$emit('fields-not-ok', values);
            }
        },

        onSubmit(event) {
            this.save(event.values);
        },
    },
};
</script>
