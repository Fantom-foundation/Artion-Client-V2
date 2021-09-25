<template>
    <div class="appcategorycard">
        <router-link :to="link">
            <div class="appcategorycard_img">
                <div class="appcategorycard_img_wrap">
                    <app-iconset :icon="category.icon || noCategoryData.icon" size="66px" original />
                </div>
            </div>
            <div class="appcategorycard_label" v-if="!noCategory">
                <h3>{{ $t(category.label) }}</h3>
                <svg
                    width="48"
                    class="rtl-mirror"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="48" height="48" rx="24" fill="#1969FF" />
                    <path
                        d="M21 18.0001L27 24.0002L21 30.0002"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div v-else class="appcategorycard_label appcategorycard_label-all">
                <h3>{{ $t(noCategoryData.label) }}</h3>
                <svg
                    width="48"
                    height="48"
                    class="rtl-mirror"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="48" height="48" rx="24" fill="white" />
                    <path
                        d="M21 18.0001L27 24.0002L21 30.0002"
                        stroke="#1969FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </router-link>
    </div>
</template>

<script>
import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';
export default {
    name: 'AppCategoryCard',
    components: { AppIconset },
    props: {
        category: {
            type: Object,
            default: () => ({
                id: '',
                icon: '',
                label: '',
            }),
        },
        noCategory: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            noCategoryData: {
                icon: 'magnifier',
                label: this.$t('appsectioncategories.allCategories'),
            },
        };
    },

    computed: {
        link() {
            return this.category.id === ''
                ? { name: 'explore' }
                : { name: 'explore', query: { category: this.category.id } };
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
