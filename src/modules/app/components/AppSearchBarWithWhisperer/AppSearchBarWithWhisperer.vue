<template>
    <div class="appsearchbarwithwhisperer" :class="classes">
        <a-search-field
            id="appsearchbarwithwhisperer_input"
            field-size="large"
            :aria-label="$t('appsearchbar.label')"
            :placeholder="$t('appsearchbar.placeholderTmp')"
            no-label
            v-model="searchText"
            :throttle-input-interval="250"
            :loading="loading"
            @focus="onSearchFieldFocus"
            @blur="onSearchFieldBlur"
            @keyup.native.enter.prevent="onEnterKey"
            @keyup.native.down="onArrowDownKey"
            @delete-text="onDeleteText"
        />

        <f-popover
            ref="popover"
            fit-height-to-viewport
            stay-in-place
            _attach-to="#appsearchbarwithwhisperer_input"
            attach-position="bottom"
            _attach-position="auto-vertical-exact"
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

export default {
    components: { AppTextSearchResults, ASearchField, FPopover },

    name: 'AppSearchBarWithWhisperer',

    data() {
        return {
            searchText: '',
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
                this._ignoreTextChange = true;
                this.searchText = value.query.search || '';

                this.hidePopover();
            },
            immediate: true,
        },

        searchText(value) {
            if (!this._ignoreTextChange) {
                this.$nextTick(() => {
                    this.search(value);
                });
            }

            this._ignoreTextChange = false;
        },
    },

    created() {
        this._ignoreTextChange = false;
        this._ignoreFocus = false;
        this._searchPhrase = '';
    },

    methods: {
        /**
         * @param {string} text
         * @return {Promise<void>}
         */
        async search(text) {
            const phrase = text.trim();

            if (phrase && phrase.length >= 2) {
                if (!this.loading) {
                    this.loading = true;

                    try {
                        const results = await textSearch(phrase, 20);

                        this.searchResults = results || [];

                        this.showPopover();

                        this.loading = false;

                        if (this._searchPhrase) {
                            this.search(this._searchPhrase);
                            this._searchPhrase = '';
                        }
                    } catch (error) {
                        this.loading = false;
                        this.hidePopover();
                        throw error;
                    }
                } else {
                    this._searchPhrase = phrase;
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

        onEnterKey() {
            const searchText = this.searchText.trim();

            if (searchText) {
                this.$router.push({ name: 'explore', query: { search: searchText } });
            }
        },

        onArrowDownKey() {
            this.showPopover();
        },

        onDeleteText() {
            console.log('ondeletetext');
            this.hidePopover();
            // this.$router.push({ name: 'explore', query: { ...(this.$route.query || {}), search: undefined } });
        },

        onSearchFieldFocus() {
            console.log('focus', this._ignoreFocus);

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
