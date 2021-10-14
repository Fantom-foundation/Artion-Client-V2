<template>
    <div class="pg-currency-dropdown">
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
                    <f-image v-if="item.img" size="40px" :src="item.img" :alt="item.label" />
                    <span>{{ item.label }}</span>
                </div>
            </template>
            <template #button-arrow>
                <span class="pg-currency-dropdown__arrow" :class="{ arrow_rotate: rotated }">
                    <svg fill="currentColor" viewBox="0 0 40 40">
                        <path
                            d="M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z"
                        ></path>
                    </svg>
                </span>
            </template>
            <template #item="{ item }">
                <div class="flex ali-center" style="column-gap: 8px;">
                    <f-image v-if="item.img" size="40px" :src="item.img" :alt="item.label" />
                    <span>{{ item.label }}</span>
                </div>
            </template>
        </a-dropdown-listbox>
    </div>
</template>
<script>
import ADropdownListbox from '@/common/components/ADropdownListbox/ADropdownListbox.vue';
import { getCurrencies } from '@/common/constants/dummy/currencyDropdown';

export default {
    name: 'PGCurrencyDropdown',
    components: { ADropdownListbox },
    data() {
        return {
            rotated: true,
            currencies: [],
            value: null,
        };
    },

    created() {
        // fetch ?
        this.currencies = getCurrencies();
        this.value = this.currencies[0].value;
    },

    watch: {
        value(_value) {
            this.$emit('currency-change', _value);
        },
    },

    methods: {
        onSelected() {
            this.rotated = !this.rotated;
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
