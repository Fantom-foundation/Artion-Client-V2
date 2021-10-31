<template>
    <f-form class="collectionregisterform" v-model="values" @submit="onSubmit">
        <div class="collectionregisterform_title">
            <h1>{{ $t('collectionregisterform.registerCollection') }}</h1>
        </div>
        <div class="collectionregisterform__desc">
            {{ $t('collectionregisterform.useOwnerAddressOfCollection') }}
        </div>
        <AUploadArea @input="setTokenImage">
            {{ $t('collectionregisterform.alsoBeUsedForNavigation') }}
        </AUploadArea>
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
            required
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
            name="fees"
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
                name="collection"
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
                name="web"
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
                :placeholder="$t('collectionregisterform.enterInstagram')"
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
                :placeholder="$t('collectionregisterform.enterMedium')"
                name="medium"
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
            <f-button type="submit" :disabled="isDisabled">{{ $t('collectionregisterform.submit') }}</f-button>
        </div>
    </f-form>
</template>

<script>
import AUploadArea from '@/common/components/AUploadArea/AUploadArea.vue';
import AddCategory from '@/modules/collections/components/AddCategory/AddCategory.vue';
export default {
    name: 'CollectionRegisterForm',

    components: { AUploadArea, AddCategory },

    data() {
        return {
            values: {
                categories: [],
            },
            imageFile: null,
        };
    },

    computed: {
        isDisabled() {
            return (
                this.values.name === '' ||
                this.values.description === '' ||
                this.values.royalty === '' ||
                this.values.fees === '' ||
                this.values.email === '' ||
                !this.imageFile
            );
        },
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

        onSubmit(_data) {
            console.log(_data);
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
