<template>
    <div class="appsearchbarwithwhisperer" :class="classes">
        <a-search-field
            id="appsearchbarwithwhisperer_input"
            field-size="large"
            :value="searchTextValue"
            :aria-label="$t('appsearchbar.label')"
            :placeholder="$t('appsearchbar.placeholder')"
            no-label
            :throttle-input-interval="250"
            :loading="loading"
            @focus="onSearchFieldFocus"
            @blur="onSearchFieldBlur"
            @keyup.native.enter.prevent="onEnterKey"
            @keyup.native.down="onArrowDownKey"
            @delete-text="onDeleteText"
            @input="onInput"
        />

        <f-popover
            ref="popover"
            fit-height-to-viewport
            stay-in-place
            attach-position="bottom"
            :attach-margin="[0, 0, 0, 0]"
            :correct-pos-on-scroll="false"
            width-as-attach
            hide-on-document-mousedown
            hide-on-document-resize
            class="fdropdownlistbox_fwindow appsearchbarwithwhisperer_popover"
            @window-hide="onPopoverHide"
        >
            <app-text-search-results :results="searchResults" />
        </f-popover>
    </div>
</template>

<script>
import ASearchField from '@/common/components/ASearchField/ASearchField.vue';
import { textSearch } from '@/modules/app/queries/text-search.js';
import AppTextSearchResults from '@/modules/app/components/AppTextSearchResults/AppTextSearchResults.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';

const SEARCH_AFTER_NUM_CHARS = 3;

export default {
    components: { AppTextSearchResults, ASearchField, FPopover },

    name: 'AppSearchBarWithWhisperer',

    data() {
        return {
            searchText: '',
            searchTextValue: '',
            searchResults: [],
            loading: false,
            popoverOn: false,
        };
    },

    computed: {
        classes() {
            return {
                'appsearchbarwithwhisperer-popoveron': this.popoverOn,
            };
        },
    },

    watch: {
        $route: {
            handler(value) {
                this.searchTextValue = value.query.search || '';
                this.searchText = this.searchTextValue;

                this.hidePopover();
            },
            immediate: true,
        },
    },

    created() {
        this._ignoreFocus = false;
        this._searchPhrase = '';
        /** Timestamp. Helper */
        this._ts = 0;
    },

    methods: {
        /**
         * @param {string} text
         * @return {Promise<void>}
         */
        async search(text) {
            const phrase = text.trim();

            if (phrase && phrase.length >= SEARCH_AFTER_NUM_CHARS) {
                this.loading = true;

                try {
                    const ts = Date.now();

                    this._ts = ts;

                    const results = await textSearch(phrase, 15);

                    if (ts === this._ts || this._ts === 0) {
                        this.searchResults = results || [];

                        this.showPopover();

                        this.loading = false;
                    }
                } catch (error) {
                    this.loading = false;
                    this.hidePopover();
                    throw error;
                }
            } else {
                this.hidePopover();
            }
        },

        showPopover() {
            const { popover } = this.$refs;

            if (popover) {
                if (this.searchResults.length > 0) {
                    popover.show();
                    this.popoverOn = true;
                } else {
                    popover.hide();
                    this.popoverOn = false;
                }
            }
        },

        hidePopover() {
            const { popover } = this.$refs;

            if (popover) {
                this.searchResults = [];
                popover.hide();
                this.popoverOn = false;
            }
        },

        onInput(text) {
            this.$nextTick(() => {
                this.search(text);
            });

            this.searchText = text;
        },

        onEnterKey() {
            const searchText = this.searchText.trim();
            const route = { name: 'explore' };

            if (searchText) {
                route.query = { search: searchText };
            }

            this.$router.push(route);
        },

        onArrowDownKey() {
            this.showPopover();
        },

        onDeleteText() {
            this.hidePopover();
            // this.$router.push({ name: 'explore', query: { ...(this.$route.query || {}), search: undefined } });
        },

        onSearchFieldFocus() {
            if (!this._ignoreFocus) {
                this.showPopover();
            }

            this._ignoreFocus = false;
        },

        onSearchFieldBlur() {
            this._ignoreFocus = false;
        },

        onPopoverHide() {
            this._ignoreFocus = true;
            this.popoverOn = false;

            this.$nextTick(() => {
                this._ignoreFocus = false;
            });
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
