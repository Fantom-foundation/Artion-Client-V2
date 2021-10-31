<template>
    <div class="nftupdatelistingbutton">
        <a-button
            :label="$t('nftupdatelisting.updateListing')"
            :loading="txStatus === 'pending'"
            @click.native="onButtonClick"
        />

        <a-tx-window ref="window" :title="$t('nftupdatelisting.updateItem')" v-slot="{ onTxStatus }">
            <nft-update-listing-form
                :token="token"
                :listing="listing"
                @transaction-status="
                    onTxStatus($event);
                    onTransactionStatus($event);
                "
            />
        </a-tx-window>
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import ATxWindow from '@/common/components/ATxWindow/ATxWindow.vue';
import NftUpdateListingForm from '@/modules/nfts/components/NftUpdateListingForm/NftUpdateListingForm.vue';

export default {
    name: 'NftUpdateListingButton',

    components: { NftUpdateListingForm, ATxWindow, AButton },

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        listing: {
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

    methods: {
        onButtonClick() {
            this.$refs.window.show();
        },

        onTransactionStatus(payload) {
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                this.$emit('tx-success');
            }
        },
    },
};
</script>
