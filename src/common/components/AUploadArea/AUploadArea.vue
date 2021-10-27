<template>
    <div class="auploadarea" :class="{ 'auploadarea-disabled': disabled }">
        <div
            class="auploadarea_content"
            tabindex="0"
            @keyup.enter.space="onActionKey"
            @click="onClick"
            @dragover.prevent
            @drop.prevent="updatePreview"
        >
            <input
                :accept="accept"
                ref="file"
                name="uploadImage"
                :multiple="multiple"
                type="file"
                autocomplete="off"
                style="display: none;"
                @change="updatePreview"
            />
            <img v-if="imagePreview" :src="imagePreview" alt="Preview Image" class="auploadarea_preview" />
            <div v-if="imagePreview" class="auploadarea_overlay">
                <button
                    aria-label="Remove image"
                    data-tooltip="Remove image"
                    @keyup.enter.space.stop="deleteImage"
                    @click.stop="deleteImage"
                >
                    <app-iconset icon="close" />
                </button>
            </div>
            <div v-if="imagePreview === null" class="auploadarea_text">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
export default {
    name: 'AUploadArea',
    components: { AppIconset },
    props: {
        accept: {
            type: String,
            default: 'image/*',
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        initialPreview: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            imagePreview: null,
        };
    },

    watch: {
        initialPreview(value) {
            this.imagePreview = value || '';
        },
    },

    methods: {
        updatePreview(e) {
            if (this.disabled) {
                return;
            }

            let files;
            e.type === 'drop' ? (files = e.dataTransfer.files) : (files = e.target.files);
            console.log(files);
            if (files.length === 0) {
                console.log('empty');
                return;
            }
            this.imagePreview = URL.createObjectURL(files[0]);
            this.$emit('input', files);
        },

        deleteImage() {
            if (this.disabled) {
                return;
            }

            this.imagePreview = null;
            this.$refs.file.value = '';
            this.$emit('input', []);
        },

        showFilePicker() {
            if (!this.disabled) {
                this.$refs.file.click();
            }
        },

        onClick() {
            this.showFilePicker();
        },

        onActionKey() {
            this.showFilePicker();
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
