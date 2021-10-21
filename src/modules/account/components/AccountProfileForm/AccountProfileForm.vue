<template>
    <f-form v-model="values" class="accountprofileform" @submit="onSubmit">
        <div class="accountprofileform_wrap">
            <div class="accountprofileform_col">
                <f-form-input
                    type="text"
                    field-size="large"
                    name="username"
                    :placeholder="$t('accountprofileform.enterUsername')"
                    :label="$t('accountprofileform.username')"
                    required
                />
                <f-form-input
                    type="textarea"
                    field-size="large"
                    :placeholder="$t('accountprofileform.enterBio')"
                    name="bio"
                    :label="$t('accountprofileform.bio')"
                    required
                />
                <f-form-input
                    type="email"
                    field-size="large"
                    name="email"
                    :placeholder="$t('accountprofileform.enterEmail')"
                    :label="$t('accountprofileform.email')"
                    required
                />
                <div class="accountprofileform_group">
                    <f-form-input
                        type="text"
                        field-size="large"
                        :placeholder="$t('accountprofileform.enterTwitter')"
                        name="twitter"
                        no-label
                    >
                        <template #prefix>
                            <app-iconset icon="twitter" size="24px" />
                        </template>
                    </f-form-input>
                    <f-form-input
                        type="text"
                        field-size="large"
                        :placeholder="$t('accountprofileform.enterInst')"
                        name="instagram"
                        no-label
                    >
                        <template #prefix>
                            <app-iconset icon="instagram" size="24px" />
                        </template>
                    </f-form-input>
                    <f-form-input
                        type="text"
                        field-size="large"
                        :placeholder="$t('accountprofileform.enterWeb')"
                        name="web"
                        no-label
                    >
                        <template #prefix>
                            <app-iconset icon="web" size="24px" />
                        </template>
                    </f-form-input>
                </div>
                <f-form-input
                    type="text"
                    field-size="large"
                    readonly
                    name="address"
                    :label="$t('accountprofileform.wallet')"
                >
                    <template #suffix>
                        <f-copy-button :text="values.address">
                            <template #button-content>
                                <app-iconset icon="copy" size="24px" />
                            </template>
                        </f-copy-button>
                    </template>
                </f-form-input>

                <h5 class="h5">{{ $t('accountprofileform.address') }}</h5>
                <div class="accountprofileform_address">
                    <f-form-input
                        type="text"
                        field-size="large"
                        name="fullname"
                        :placeholder="$t('accountprofileform.enterFullname')"
                        :label="$t('accountprofileform.fullname')"
                    />
                    <f-form-input
                        type="text"
                        field-size="large"
                        :placeholder="$t('accountprofileform.enterPhone')"
                        name="phone"
                        :label="$t('accountprofileform.phone')"
                    />
                    <f-form-input
                        type="text"
                        field-size="large"
                        name="street"
                        :placeholder="$t('accountprofileform.enterStreet')"
                        :label="$t('accountprofileform.street')"
                    />
                    <f-form-input
                        type="text"
                        field-size="large"
                        name="apartment"
                        :placeholder="$t('accountprofileform.enterApartment')"
                        :label="$t('accountprofileform.apartment')"
                    />
                    <f-form-input
                        type="text"
                        field-size="large"
                        :placeholder="$t('accountprofileform.enterCity')"
                        name="city"
                        :label="$t('accountprofileform.city')"
                    />
                    <f-form-input
                        type="text"
                        field-size="large"
                        name="state"
                        :placeholder="$t('accountprofileform.enterState')"
                        :label="$t('accountprofileform.state')"
                    />
                    <f-form-input
                        type="text"
                        field-size="large"
                        name="country"
                        :placeholder="$t('accountprofileform.enterCountry')"
                        :label="$t('accountprofileform.country')"
                    />
                    <f-form-input
                        type="text"
                        field-size="large"
                        :placeholder="$t('accountprofileform.enterZip')"
                        name="zip"
                        :label="$t('accountprofileform.zip')"
                    />
                </div>
            </div>
            <div class="accountprofileform_col">
                <div class="accountprofileform_avatar">
                    <div class="accountprofileform_label">
                        {{ $t('accountprofileform.profileImg') }}
                    </div>
                    <AUploadArea @input="uploadUserAvatar" />
                </div>
                <div class="accountprofileform_banner">
                    <div class="accountprofileform_label">
                        {{ $t('accountprofileform.profileBanner') }}
                    </div>
                    <AUploadArea @input="uploadUserBanner" />
                </div>
            </div>
        </div>
        <div class="accountprofileform_btn">
            <f-button type="submit" :disabled="isDisable">{{ $t('accountprofileform.save') }}</f-button>
        </div>
    </f-form>
</template>
<script>
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import FCopyButton from 'fantom-vue-components/src/components/FCopyButton/FCopyButton.vue';
import AUploadArea from '@/common/components/AUploadArea/AUploadArea';
import { getUser } from '@/modules/account/queries/user.js';
import { updateUser } from '@/modules/account/mutations/update-user.js';
import { mapState } from 'vuex';
import { signIn, getBearerToken } from '@/modules/account/auth.js';
import { uploadUserFile } from '@/utils/upload.js';
export default {
    name: 'AccountProfileForm',

    components: { AppIconset, FCopyButton, AUploadArea },

    data() {
        return {
            values: {},
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        isDisable() {
            return this.values.username === '' || this.values.bio === '' || this.values.email === '';
        },
    },

    watch: {
        walletAddress: {
            async handler(value) {
                if (value) {
                    this.values = await getUser(value);
                } else {
                    this.values = {};
                }
            },
            immediate: true,
        },
    },

    methods: {
        async onSubmit(event) {
            let result = await updateUser(event.values);
            console.log(result);
        },

        async checkUserSingIn() {
            let ok = true;
            if (!getBearerToken()) {
                ok = await signIn();
            }

            return ok;
        },

        async uploadUserAvatar(files) {
            let isSignIn = await this.checkUserSingIn();
            if (isSignIn) {
                uploadUserFile(files, 'avatar');
            }
        },

        async uploadUserBanner(files) {
            let isSignIn = await this.checkUserSingIn();
            if (isSignIn) {
                uploadUserFile(files, 'banner');
            }
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
