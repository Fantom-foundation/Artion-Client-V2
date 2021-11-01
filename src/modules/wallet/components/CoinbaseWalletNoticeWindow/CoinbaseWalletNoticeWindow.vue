<template>
    <a-window ref="window" :title="$t('notice')" class="fwindow-width-3">
        Please select <b>Fantom Opera</b> network on Coinbase Wallet:
        <ol>
            <li>
                Tap the
                <img
                    src="https://help.coinbase.com/content/dam/help/articles/wallet/Settings%20Tab.png"
                    alt="settings icon"
                    height="18"
                />
                in the mobile app.
            </li>
            <li>Tap <b>Active network</b>.</li>
            <li>Select <b>Fantom Opera</b>.</li>
        </ol>
    </a-window>
</template>

<script>
import { mapState } from 'vuex';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import AWindow from '@/common/components/AWindow/AWindow.vue';

export default {
    name: 'CoinbaseWalletNoticeWindow',

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState('wallet', {
            chainId: 'chainId',
        }),
    },

    watch: {
        chainId: {
            handler() {
                const { $wallet } = this;

                if ($wallet.is('coinbase') && !this.disabled) {
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
