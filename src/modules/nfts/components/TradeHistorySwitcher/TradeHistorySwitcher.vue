<template>
    <div class="tradehistoryswitcher">
        <f-button area-label="Filter" data-tooltip="Filter" :id="buttonId" @click.native="onButtinClick">
            <app-iconset size="20px" icon="filter" />
        </f-button>
        <f-popover
            v-if="showModal"
            ref="popover"
            :attach-to="`#${buttonId}`"
            :with-header="true"
            title="Filter By"
            attach-position="left"
            :attach-margin="[0, 0, 0, 0]"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            hide-on-document-mousedown
            class="tradehistoryswitcher_window"
            @window-hide="$emit('window-hide', $event)"
        >
            <f-listbox
                :data="dShareItems"
                ref="listbox"
                :focus-item-on-focus="true"
                class="tradehistoryswitcher_flistbox"
                @component-change="onListboxItemSelected"
            >
                <template v-slot="{ item }">
                    <div class="tradehistoryswitcher_listitem" tabindex="0">
                        {{ $t(item.label) }}
                        <app-iconset size="32px" v-if="item.checked" :icon="item.icon" original />
                    </div>
                </template>
            </f-listbox>
        </f-popover>
    </div>
</template>
<script>
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
import { getUniqueId, defer } from 'fantom-vue-components/src/utils';
export default {
    name: 'TradeHistorySwitcher',
    components: { AppIconset, FListbox, FPopover },
    data() {
        return {
            buttonId: getUniqueId(),
            showModal: true,
            shareItems: [
                {
                    label: 'Trade History',
                    icon: 'check',
                    component: 'NftHistoryGrid',
                    checked: true,
                },
                {
                    label: 'Transfer History',
                    icon: 'check',
                    component: 'NftTradeGrid',
                    checked: false,
                },
            ],
        };
    },

    computed: {
        dShareItems() {
            return this.shareItems.map((item, idx) => {
                return { ...item, _idx: idx };
            });
        },
    },
    methods: {
        onButtinClick() {
            this.$nextTick(() => {
                const { $refs } = this;
                $refs.popover.show();
                defer(() => {
                    $refs.listbox.focus();
                });
            });
        },

        onListboxItemSelected(item) {
            this.dShareItems.forEach(o => {
                if (o._idx !== item._idx) {
                    o.checked = false;
                } else {
                    o.checked = true;
                }
            });
            this.$emit('filter-switch', item.component);
            this.$refs.popover.hide();
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
