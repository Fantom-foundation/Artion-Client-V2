<template>
    <div class="addcategory">
        <div class="addcategory_col">
            <f-button :id="buttonId" @click.native="onButtinClick">{{ $t('addcategory.addCategory') }}</f-button>
            <f-popover
                ref="popover"
                :attach-to="`#${buttonId}`"
                attach-position="auto-vertical-exact"
                :attach-margin="[0, 0, 0, 0]"
                animation-in="scale-center-enter-active"
                animation-out="scale-center-leave-active"
                hide-on-document-mousedown
                class="addcategory_window"
                @window-hide="$emit('window-hide', $event)"
            >
                <f-listbox
                    :data="cCategories"
                    ref="listbox"
                    class="addcategory_flistbox"
                    @component-change="onListboxItemSelected"
                >
                    <template v-slot="{ item }">
                        <div class="addcategory_listitem" tabindex="0">
                            <app-iconset size="32px" :icon="item.icon" original />
                            {{ $t(item.label) }}
                        </div>
                    </template>
                </f-listbox>
            </f-popover>
        </div>
        <div class="addcategory_col">
            <a-filter-chips v-model="data" @clear-all="data = []" />
        </div>
    </div>
</template>

<script>
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
import AFilterChips from '@/common/components/AFilterChips/AFilterChips.vue';
import { CATEGORIES } from '@/common/constants/categories.js';
import { getUniqueId, defer } from 'fantom-vue-components/src/utils';
export default {
    name: 'AddCategory',

    props: {
        categories: {
            type: Array,
            default() {
                return CATEGORIES();
            },
        },
    },

    components: {
        FPopover,
        FListbox,
        AppIconset,
        AFilterChips,
    },

    data() {
        return {
            buttonId: getUniqueId(),
            showModal: true,
            data: [],
        };
    },

    computed: {
        cCategories() {
            return this.categories.map((category, idx) => {
                return { ...category, value: category.id, id: undefined, _idx: idx, label: this.$t(category.label) };
            });
        },
    },

    watch: {
        data(_value) {
            let val = _value.length ? _value.map(val => val.value) : [];
            this.$emit('change', val);
        },
    },

    methods: {
        onListboxItemSelected(item) {
            let index = this.data.findIndex(category => category.value === item.value);
            if (index === -1) {
                this.data = [...this.data, { ...item }];
            }
            this.$refs.popover.hide();
        },

        onButtinClick() {
            this.$nextTick(() => {
                const { $refs } = this;
                $refs.popover.show();
                defer(() => {
                    $refs.listbox.focus();
                });
            });
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
