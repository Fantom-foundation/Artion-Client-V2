<template>
    <div class="nftitemactivityfilter">
        <f-button
            secondary
            size="large"
            :id="buttonId"
            :label="$t('nftitemactivityfilter.filter')"
            @click.native="onInputClick"
        />
        <f-popover
            v-if="showModal"
            ref="popover"
            :attach-to="`#${buttonId}`"
            attach-position="auto-vertical-exact"
            :attach-margin="[0, 0, 0, 0]"
            :prevent-focus="false"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            hide-on-document-mousedown
            width-as-attach
            class="nftitemactivityfilter_window fdropdownlistbox_fwindow"
            @window-hide="$emit('window-hide', $event)"
        >
            <f-listbox
                :data="options"
                multiselect
                v-model="selectedItems"
                ref="listbox"
                :focus-item-on-focus="true"
                class="nftitemactivityfilter_flistbox"
                @component-change="onListboxItemSelected"
            >
                <template v-slot="{ item }">
                    <div class="nftitemactivityfilter_listitem" tabindex="0">
                        {{ item.value }}
                    </div>
                </template>
            </f-listbox>
        </f-popover>
    </div>
</template>

<script>
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
import { ACTIVITY_TYPES } from '@/common/constants/activity-type-filters.js';
import { getUniqueId, defer } from 'fantom-vue-components/src/utils';

export default {
    name: 'NftItemActivityFilter',

    components: { FListbox, FPopover },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        selected: {
            type: Object,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            buttonId: getUniqueId(),
            showModal: true,
            selectedItems: [],
            data: ACTIVITY_TYPES(),
            options: [
                {
                    value: this.$t('nftitemactivityfilter.sales'),
                    pattern: /SOLD|RESOLVED/,
                },
                {
                    value: this.$t('nftitemactivityfilter.transfers'),
                    pattern: /TRANSFER|MINT|BURN/,
                },
                {
                    value: this.$t('nftitemactivityfilter.listings'),
                    pattern: /LISTING/,
                },
                {
                    value: this.$t('nftitemactivityfilter.offers'),
                    pattern: /OFFER/,
                },
                {
                    value: this.$t('nftitemactivityfilter.auctions'),
                    pattern: /AUCTION/,
                },
            ],
        };
    },

    watch: {
        selected(value) {
            this.selectedItems = Object.keys(value);
        },
    },

    methods: {
        onInputClick() {
            this.$nextTick(() => {
                const { $refs } = this;
                $refs.popover.show();
                defer(() => {
                    $refs.listbox.focus();
                });
            });
        },
        onListboxItemSelected(items) {
            let filters = {};
            items.forEach(item => {
                let index = this.options.findIndex(filter => filter.value === item.value);
                let types = ACTIVITY_TYPES().filter(type => this.options[index].pattern.test(type.filter));
                filters[item.value] = types;
            });

            this.$emit('change', filters);
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
