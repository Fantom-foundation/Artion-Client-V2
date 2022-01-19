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
            />
        </f-popover>
    </div>
</template>

<script>
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
import { ACTIVITY_TYPES } from '@/common/constants/activity-type-filters.js';
import { getUniqueId, defer } from 'fantom-vue-components/src/utils';
import { ITEM_ACTIVITY_FILTER_OPTIONS } from '@/modules/nfts/components/NftItemActivity/filter-options.js';

export default {
    name: 'NftItemActivityFilter',

    components: { FListbox, FPopover },

    model: {
        prop: 'selected',
        event: 'change',
    },

    props: {
        selected: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            buttonId: getUniqueId(),
            showModal: true,
            selectedItems: this.selected,
            data: ACTIVITY_TYPES(),
            options: ITEM_ACTIVITY_FILTER_OPTIONS(),
        };
    },

    watch: {
        selected(value) {
            this.selectedItems = value;
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
            this.$emit(
                'change',
                items.map(item => item.value)
            );
        },
    },
};
</script>

<style lang="scss">
@import 'style';
</style>
