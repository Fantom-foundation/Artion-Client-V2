<template>
    <div class="acurrencydropdown" :class="{ 'acurrencydropdown-noarrow': currencies.length < 2 }">
        <a-dropdown-listbox
            v-bind="$attrs"
            :data="currencies"
            v-model="value"
            @click.native="rotated = !rotated"
            @component-change="onSelected"
            @window-hide="windowHide"
        >
            <template #button-label="{ item }">
                <div class="flex ali-center">
                    <f-image v-if="item.img" size="24px" :src="item.img" :alt="item.label" />
                    <span>{{ item.label }}</span>
                </div>
            </template>
            <template #button-arrow>
                <span class="acurrencydropdown_arrow" :class="{ arrow_rotate: rotated }">
                    <svg fill="currentColor" viewBox="0 0 40 40">
                        <path
                            d="M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z"
                        ></path>
                    </svg>
                </span>
            </template>
            <template #item="{ item }">
                <div class="flex ali-center" style="column-gap: 8px;">
                    <f-image v-if="item.img" size="24px" :src="item.img" :alt="item.label" />
                    <span>{{ item.label }}</span>
                </div>
            </template>
        </a-dropdown-listbox>
    </div>
</template>
<script>
import ADropdownListbox from '@/common/components/ADropdownListbox/ADropdownListbox.vue';

export default {
    name: 'ACurrencyDropdown',

    components: { ADropdownListbox },

    props: {
        /** @type {PayToken[]} */
        currencies: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            rotated: true,
            value: null,
        };
    },

    watch: {
        currencies: {
            handler(value) {
                this.value = value && value.length > 0 ? value[0].value : 0;
            },
            immediate: true,
        },
    },

    methods: {
        onSelected(item) {
            this.rotated = !this.rotated;
            this.$emit('token-selected', item);
        },
        windowHide() {
            this.rotated = !this.rotated;
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
