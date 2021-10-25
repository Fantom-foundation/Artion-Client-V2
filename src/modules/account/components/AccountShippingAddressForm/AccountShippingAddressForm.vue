<template>
    <f-form v-model="values" @submit="onSubmit" class="accountshippingaddressform grid">
        <template v-if="useUserProfileInputs">
            <f-form-input
                type="email"
                field-size="large"
                name="email"
                :label="$t('accountprofileform.email')"
                required
                validate-on-input
            />
        </template>

        <f-form-input
            type="text"
            field-size="large"
            name="fullname"
            :label="$t('accountshippingaddressform.fullname')"
            :required="required"
            validate-on-input
        />
        <f-form-input
            type="text"
            field-size="large"
            name="phone"
            :label="$t('accountshippingaddressform.phone')"
            :required="required"
            validate-on-input
        />
        <f-form-input
            type="text"
            field-size="large"
            name="street"
            :label="$t('accountshippingaddressform.street')"
            class="md:col-6"
            :required="required"
            validate-on-input
        />
        <f-form-input
            type="text"
            field-size="large"
            name="apartment"
            :label="$t('accountshippingaddressform.apartment')"
            class="md:col-6"
        />
        <f-form-input
            type="text"
            field-size="large"
            name="city"
            :label="$t('accountshippingaddressform.city')"
            :required="required"
            validate-on-input
        />
        <f-form-input
            type="text"
            field-size="large"
            name="country"
            :label="$t('accountshippingaddressform.country')"
            class="md:col-4"
            :required="required"
            validate-on-input
        />
        <f-form-input
            type="text"
            field-size="large"
            name="state"
            :label="$t('accountshippingaddressform.state')"
            class="md:col-4"
            :required="required"
            validate-on-input
        />
        <f-form-input
            type="text"
            field-size="large"
            name="zip"
            :label="$t('accountshippingaddressform.zip')"
            class="md:col-4"
            :required="required"
            validate-on-input
        />

        <div>
            <a-button type="submit" size="large" :loading="saving">
                {{ $t('accountshippingaddressform.save') }}
            </a-button>
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
        required: {
            type: Boolean,
            default: false,
        },
        useUserProfileInputs: {
            type: Boolean,
            default: false,
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
                } else {
                    this.values = {};
                }
            },
            immediate: true,
        },
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

        onSubmit(event) {
            this.save(event.values);
        },
    },
};
</script>

<!--<style lang="scss"></style>-->
