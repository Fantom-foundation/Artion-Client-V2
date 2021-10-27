<template>
    <a-window
        ref="window"
        v-bind="$attrs"
        :title="`${$t('redeem')} ${token.name}`"
        :closing-disabled="windowDisabled"
        class="fwindow-width-5"
    >
        <nft-redeem :token="token" @transaction-status="onTransactionStatus" />
    </a-window>
</template>

<script>
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import NftRedeem from '@/modules/nfts/components/NftRedeem/NftRedeem.vue';

export default {
    name: 'NftRedeemWindow',

    components: { NftRedeem },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            txStatus: '',
        };
    },

    computed: {
        windowDisabled() {
            return this.txStatus === 'pending';
        },
    },

    methods: {
        ...copyMethods(AWindow, ['show', 'hide', 'toggle'], 'window'),

        onTransactionStatus(payload) {
            this.txStatus = payload.status;
        },
    },
};
</script>
