<template>
    <f-form class="collectionregisterform" v-model="values" @submit="onSubmit" :aria-label="$t('registerCollection')">
        <div class="collectionregisterform_title">
            <h1 data-focus>{{ $t('collectionregisterform.registerCollection') }}</h1>
        </div>
        <div class="collectionregisterform__desc">
            {{ $t('collectionregisterform.useOwnerAddressOfCollection') }}
        </div>
        <a-upload-area @input="setTokenImage" class="auploadarea-nobackground">
            {{ $t('collectionregisterform.alsoBeUsedForNavigation') }}
        </a-upload-area>
        <f-form-input
            type="text"
            field-size="large"
            name="name"
            :label="$t('collectionregisterform.name')"
            :placeholder="$t('collectionregisterform.collectionName')"
            required
        />
        <f-form-input
            :label="$t('collectionregisterform.description')"
            field-size="large"
            type="textarea"
            name="description"
            :placeholder="$t('collectionregisterform.provideYourDescription')"
            required
            rows="5"
        />
        <f-form-input
            :validator="royaltyValidator"
            validate-on-change
            validate-on-input
            :error-message="$t('collectionregisterform.royaltyErr')"
            type="number"
            name="royalty"
            field-size="large"
        >
            <template #label>
                {{ $t('collectionregisterform.royalty') }}
                <button class="label_btn" :data-tooltip="$t('collectionregisterform.royaltyTooltip')">
                    <app-iconset icon="question" />
                </button>
            </template>
        </f-form-input>
        <f-form-input
            type="text"
            name="feeRecipient"
            field-size="large"
            :placeholder="$t('collectionregisterform.feeRecipient')"
            required
        >
            <template #label>
                {{ $t('collectionregisterform.feeRecipient') }}
                <button class="label_btn" :data-tooltip="$t('collectionregisterform.feesTooltip')">
                    <app-iconset icon="question" />
                </button>
            </template>
        </f-form-input>
        <div class="collectionregisterform_categories">
            <div class="collectionregisterform_categories_label">{{ $t('collectionregisterform.category') }}</div>
            <AddCategory @change="values.categories = $event" />
        </div>
        <div class="collectionregisterform_group">
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('collectionregisterform.enterCollection')"
                name="contract"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="nft" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('collectionregisterform.enterWebsite')"
                name="siteUrl"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="web" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('collectionregisterform.enterDiscord')"
                name="discord"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="discord" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('collectionregisterform.enterTwitter')"
                name="twitterHandle"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="twitter-grey" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('collectionregisterform.enterInstagram')"
                name="instagramHandle"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="instagram" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('collectionregisterform.enterMedium')"
                name="mediumHandle"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="medium" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('collectionregisterform.enterTelegram')"
                name="telegram"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="telegram" size="24px" />
                </template>
            </f-form-input>
        </div>
        <f-form-input
            type="email"
            name="email"
            field-size="large"
            :placeholder="$t('collectionregisterform.emailAddress')"
            required
        >
            <template #label>
                {{ $t('collectionregisterform.contactEmail') }}
                <button class="label_btn" :data-tooltip="$t('collectionregisterform.emailTooltip')">
                    <app-iconset icon="question" />
                </button>
            </template>
        </f-form-input>
        <div class="collectionregisterform_btn">
            <a-button type="submit" :disabled="isDisabled" :loading="isLoading">
                {{ $t('collectionregisterform.submit') }}
            </a-button>
        </div>
    </f-form>
</template>

<script>
import AUploadArea from '@/common/components/AUploadArea/AUploadArea.vue';
import AddCategory from '@/modules/collections/components/AddCategory/AddCategory.vue';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { uploadCollection } from '@/utils/upload';
import { checkSignIn } from '@/modules/account/auth';
import AButton from '@/common/components/AButton/AButton';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';

export default {
    name: 'CollectionRegisterForm',

    mixins: [eventBusMixin],

    components: { AUploadArea, AddCategory, AButton },

    data() {
        return {
            values: {
                categories: [],
            },
            imageFile: null,
            isLoading: false,
        };
    },

    computed: {
        isDisabled() {
            return (
                this.values.name === '' ||
                this.values.description === '' ||
                this.values.contract === '' ||
                this.values.feeRecipient === '' ||
                this.values.email === '' ||
                !this.imageFile
            );
        },
    },

    mounted() {
        focusElem(this.$el);
    },

    methods: {
        royaltyValidator(_value) {
            if (_value === '') return _value;
            _value = Number(_value);
            return !(_value >= 1 && _value <= 100);
        },

        setTokenImage(_files) {
            this.imageFile = _files[0] || null;
        },

        async onSubmit(_data) {
            console.log('onSubmit', _data);
            const vals = _data.values;
            this.isLoading = true;

            await this.checkWalletConnection();
            let signed = await checkSignIn();
            if (!signed) {
                console.error('not signed');
                notifications.add({
                    type: 'error',
                    text: this.$t('collectionregisterform.signInFirst'),
                });
                return;
            }

            const collectionApplication = {
                contract: vals.contract,
                name: vals.name,
                description: vals.description,
                royalty: vals.royalty ? vals.royalty : 0,
                feeRecipient: vals.feeRecipient,
                categories: vals.categories,
                discord: vals.discord,
                email: vals.email,
                telegram: vals.telegram,
                siteUrl: vals.siteUrl,
                mediumHandle: vals.mediumHandle,
                twitterHandle: vals.twitterHandle,
                instagramHandle: vals.instagramHandle,
            };
            try {
                await uploadCollection(collectionApplication, this.imageFile);
            } catch (err) {
                console.error('uploadCollection failed', err);
                notifications.add({
                    type: 'error',
                    text: this.$t('collectionregisterform.wasntUploaded') + err,
                });
                this.isLoading = false;
                return;
            }

            notifications.add({
                type: 'success',
                text: this.$t('collectionregisterform.success'),
            });
            this.isLoading = false;
        },

        async checkWalletConnection() {
            if (!this.$wallet.connected) {
                const payload = {};
                this._eventBus.emit('show-wallet-picker', payload);
                await payload.promise;
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
