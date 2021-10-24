<template>
    <div class="asharebutton">
        <f-button secondary :id="buttonId" @click.native="onButtinClick">
            <app-iconset icon="share" />
        </f-button>
        <f-popover
            v-if="showModal"
            ref="popover"
            :attach-to="`#${buttonId}`"
            attach-position="auto-vertical-exact"
            :attach-margin="[0, 0, 0, 0]"
            animation-in="scale-center-enter-active"
            animation-out="scale-center-leave-active"
            hide-on-document-mousedown
            class="asharebutton_window"
            @window-hide="$emit('window-hide', $event)"
        >
            <f-listbox
                :data="dShareItems"
                ref="listbox"
                :focus-item-on-focus="true"
                class="asharebutton_flistbox"
                @component-change="onListboxItemSelected"
            >
                <template v-slot="{ item }">
                    <div class="asharebutton_listitem" tabindex="0">
                        <app-iconset size="32px" :icon="item.icon" original />
                        {{ $t(item.label) }}
                    </div>
                </template>
            </f-listbox>
        </f-popover>
        <!-- <f-notifications with-icon position="bottom-right" /> -->
    </div>
</template>
<script>
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import FListbox from 'fantom-vue-components/src/components/FListbox/FListbox.vue';
import FPopover from 'fantom-vue-components/src/components/FPopover/FPopover.vue';
//import FNotifications from 'fantom-vue-components/src/components/FNotifications/FNotifications.vue';
import { getUniqueId, defer } from 'fantom-vue-components/src/utils';
export default {
    name: 'AShareButton',
    components: {
        AppIconset,
        FListbox,
        FPopover,
        //    FNotifications,
    },
    data() {
        return {
            buttonId: getUniqueId(),
            showModal: true,
            shareItems: [
                {
                    label: this.$t('ashareButton.copy'),
                    icon: 'logo',
                    link: false,
                },
                {
                    label: this.$t('ashareButton.shareFacebook'),
                    icon: 'facebook',
                    link: 'https://www.facebook.com/sharer/sharer.php?u=',
                },
                {
                    label: this.$t('ashareButton.shareTwitter'),
                    icon: 'twitter',
                    link: 'https://twitter.com/intent/tweet?u=',
                },
            ],
        };
    },

    computed: {
        dShareItems() {
            return this.shareItems.map((item, idx) => {
                // return { ...item, value: item.id, label: this.$t(item.label), id: undefined };
                return { ...item, _idx: idx };
            });
        },
    },

    methods: {
        onButtinClick() {
            //this.$refs.popover.toggle();
            //if(this.$refs.popover) this.$refs.listbox.focus();
            this.$nextTick(() => {
                const { $refs } = this;
                $refs.popover.show();
                defer(() => {
                    $refs.listbox.focus();
                });
            });
        },
        onListboxItemSelected(item) {
            const currentLink = window.location.href;
            if (item.link === false) {
                this.copyToClickBoard(currentLink);
                this.$notifications.add({
                    type: 'success',
                    text: this.$t('ashareButton.successCopied'),
                });
            } else {
                const newLink = item.link + currentLink;
                window.open(newLink);
            }
            this.$refs.popover.hide();
        },

        copyToClickBoard(link) {
            let input = document.createElement('input');
            document.body.appendChild(input);
            input.value = link;
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
