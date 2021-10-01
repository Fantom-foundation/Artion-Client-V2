<template>
    <f-form v-model="values" class="nftcreate_form" @submit="onSubmit">
        <div class="nftcreate_col">
            upload component
        </div>
        <div class="nftcreate_col">
            <div class="nftcreate_wrap">
                <div class="nftcreate_panel">
                    <a-dropdown-listbox :label="$t('nftcreate.collection')" class="collection_list" :data="collections">
                        <template #button-label="{ item }">
                            <div class="flex ali-center">
                                <f-image v-if="item.img" size="24px" :src="item.img" :alt="item.label" />
                                <span>{{ item.label }}</span>
                                <f-form-input
                                    type="text"
                                    name="collectionId"
                                    style="width:0;height:0;opacity: 0;"
                                    :modelValue="item.value"
                                />
                            </div>
                        </template>
                        <template #item="{ item }">
                            <div class="flex ali-center">
                                <f-image v-if="item.img" size="24px" :src="item.img" :alt="item.label" />
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </a-dropdown-listbox>
                    <f-form-input :label="$t('nftcreate.name')" field-size="large" type="text" name="name" />
                    <f-form-input
                        :label="$t('nftcreate.symbol')"
                        field-size="large"
                        type="text"
                        name="symbol"
                        class="fforminput_symbol"
                    />
                    <f-form-input
                        :label="$t('nftcreate.description')"
                        field-size="large"
                        type="textarea"
                        name="description"
                        rows="5"
                    />
                </div>
                <div class="nftcreate_panel">
                    <f-form-input
                        :validator="validator"
                        validate-on-change
                        validate-on-input
                        :error-message="$t('nftcreate.royaltyErr')"
                        type="number"
                        name="royalty"
                        field-size="large"
                    >
                        <template #label>
                            {{ $t('nftcreate.royalty') }}
                            <button class="label_btn" :data-tooltip="$t('nftcreate.royaltyTooltip')">
                                <app-iconset icon="question" />
                            </button>
                        </template>
                    </f-form-input>
                    <f-form-input field-size="large" type="text" name="linkToIp">
                        <template #label>
                            {{ $t('nftcreate.linkToIp') }}
                            <button class="label_btn" :data-tooltip="$t('nftcreate.linkToIpTooltip')">
                                <app-iconset icon="question" />
                            </button>
                        </template>
                    </f-form-input>
                    <f-form-input type="toggle" :label="$t('nftcreate.unlockContent')" name="unlockContentToogle" />
                    <f-form-input
                        :label="$t('nftcreate.unlockContent')"
                        v-if="values.unlockContentToogle"
                        field-size="large"
                        type="textarea"
                        name="unlockContent"
                    />
                </div>
            </div>
            <div class="nftcreate_btn">
                <f-button type="submit" size="large" :disabled="isDisabled">{{ $t('nftcreate.mint') }}</f-button>
            </div>
            <div class="nftcreate_info">
                <f-message type="info" with-icon>{{ $t('nftcreate.messageFtm') }}</f-message>
            </div>
        </div>
    </f-form>
</template>
<script>
import ADropdownListbox from '@/common/components/ADropdownListbox/ADropdownListbox.vue';
import FMessage from 'fantom-vue-components/src/components/FMessage/FMessage.vue';
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import { collections } from '@/common/constants/collections';
export default {
    name: 'NftCreateForm',
    components: { ADropdownListbox, FMessage, AppIconset },
    data() {
        return {
            values: {},
            collections,
        };
    },

    computed: {
        isDisabled() {
            // add wallet connection and image
            return this.values.name === '';
        },
    },

    methods: {
        validator(_value) {
            if (_value === '') return _value;
            _value = Number(_value);
            return !(_value >= 1 && _value <= 100);
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
