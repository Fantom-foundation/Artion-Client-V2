<template>
    <a-window ref="window" :title="$t('notice')" class="fwindow-width-3">
        Please, select <b>Fantom Opera</b> network in the Metamask.
    </a-window>
</template>

<script>
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import { mapState } from 'vuex';

export default {
    name: 'MetamaskWalletNoticeWindow',

    computed: {
        ...mapState('wallet', {
            chainId: 'chainId',
        }),
    },

    watch: {
        chainId: {
            handler() {
                const { $wallet } = this;

                if ($wallet.is('metamask')) {
                    if ($wallet.isCorrectChainId()) {
                        this.hide();
                    } else {
                        this.show();
                    }
                }
            },
            immediate: true,
        },
    },

    methods: {
        ...copyMethods(AWindow, ['show', 'hide'], 'window'),
    },
};
</script>
