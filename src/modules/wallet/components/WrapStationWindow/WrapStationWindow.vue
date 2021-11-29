<template>
    <a-tx-window ref="window" :title="$t('wrapStation')" v-slot="{ onTxStatus }">
        <wrap-station-form :wallet-address="walletAddress" @transaction-status="onTxStatus($event)" />
    </a-tx-window>
</template>

<script>
import ATxWindow from '@/common/components/ATxWindow/ATxWindow.vue';
import WrapStationForm from '@/modules/wallet/components/WrapStationForm/WrapStationForm.vue';
import { mapState } from 'vuex';

export default {
    name: 'WrapStationWindow',

    components: { WrapStationForm, ATxWindow },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    methods: {
        show() {
            this.$refs.window.show();
        },
    },
};
</script>
