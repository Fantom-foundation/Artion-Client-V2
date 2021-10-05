<template>
    <div class="afilterchips">
        <f-chips :data="dData" removable size="large" focus-item-on-focus v-bind="$attrs" @change="onChange">
            <template #remove-button>
                <span class="flistbox_list_item_removebutton" aria-hidden="true">
                    <app-iconset size="12px" icon="close" />
                </span>
            </template>

            <!-- copy slots -->
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </f-chips>

        <f-button
            v-show="dData.length > 0"
            label="Clear all"
            tertiary
            data-test-id="clear_all_btn"
            @click.native="onClearAllBtnClick"
        />
    </div>
</template>

<script>
import FChips from 'fantom-vue-components/src/components/FChips/FChips.vue';
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';
import AppIconset from '@/modules/app/components/AppIconset/AppIconset.vue';

/**
 * FChips wrapper
 */
export default {
    name: 'AFilterChips',

    components: { FChips, AppIconset, FButton },

    model: {
        prop: 'data',
        event: 'change',
    },

    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            dData: this.data,
        };
    },

    watch: {
        data(value) {
            this.dData = value;
        },
    },

    methods: {
        onChange(data) {
            this.dData = data;
            this.$emit('change', data);
        },

        onClearAllBtnClick() {
            this.$emit('clear-all');

            this.dData = [];
            this.$emit('change', this.dData);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
