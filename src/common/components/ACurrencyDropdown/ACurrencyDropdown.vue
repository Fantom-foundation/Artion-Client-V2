<template>
    <div class="acurrencydropdown" :class="{ 'acurrencydropdown-noarrow': currencies.length < 2 }">
        <a-dropdown-listbox
            v-bind="$attrs"
            :data="currencies"
            :disabled="disabled"
            v-model="value"
            @click.native="onDropdownClick"
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
import { compareAddresses } from '@/utils/address.js';

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
        /** Selected pay token address */
        selected: {
            type: String,
            default: '',
        },
        /** Fire 'token-selected' event immediately  */
        selectImmediately: {
            type: Boolean,
            default: false,
        },
        /** */
        disabled: {
            type: Boolean,
            default: false,
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
            handler() {
                const selectedToken = this.getSelectedTokenByAddress(this.selected);

                this.value = selectedToken ? selectedToken.value : null;

                if (this.selectImmediately && selectedToken) {
                    this.onSelected(selectedToken);
                }
            },
            immediate: true,
        },
        selected: {
            handler(value) {
                const selectedToken = this.getSelectedTokenByAddress(value);

                this.value = selectedToken ? selectedToken.value : null;

                if (this.selectImmediately && selectedToken) {
                    this.onSelected(selectedToken);
                }
            },
            immediate: true,
        },
    },

    methods: {
        /**
         * @return {Object|null}
         */
        getSelectedToken() {
            return this.getSelectedTokenByValue(this.value);
        },

        /**
         * @param {string} tokenAddress
         * @return {null|*}
         */
        getSelectedTokenByAddress(tokenAddress) {
            const { currencies } = this;

            if (currencies.length > 0) {
                return tokenAddress
                    ? currencies.find(token => compareAddresses(token.address, tokenAddress))
                    : currencies[0];
            }

            return null;
        },

        /**
         * @param {string} value Token code
         * @return {*}
         */
        getSelectedTokenByValue(value) {
            return this.currencies.find(token => token.value === value);
        },

        windowHide() {
            this.toggleRotated();
        },

        toggleRotated() {
            this.rotated = !this.rotated;
        },

        onSelected(item) {
            this.toggleRotated();
            this.$emit('token-selected', item);
        },

        onDropdownClick() {
            if (!this.disabled) {
                this.toggleRotated();
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
