<template>
    <div class="NftAuction">
        <a-details>
            <template #label>
                <div class="nftdetail_details_wrap">
                    {{ $t('nftauction.saleEndsIn') }} 3 Days (06.10.2021, 17:03:15)
                </div>
            </template>
            <template>
                <div class="nftdetail_sail">
                    <div class="nftdetail_sail_item">
                        {{ $t('nftauction.reservePrice') }}:&nbsp;<img src="/img/tmp/ftm.png" alt="FTM" />&nbsp;100
                    </div>
                    <div class="nftdetail_sail_item">
                        {{ $t('nftauction.highestBid') }}:&nbsp;<img src="/img/tmp/ftm.png" alt="FTM" />&nbsp;100
                    </div>
                    <div class="nftdetail_sail_item nftdetail_sail_btn">
                        <f-button>{{ $t('nftauction.placeBid') }}</f-button>
                    </div>
                </div>
            </template>
        </a-details>
    </div>
</template>

<script>
import ADetails from '@/common/components/ADetails/ADetails.vue';
import { getAuction } from '@/modules/nfts/queries/auction.js';

export default {
    name: 'NftAuction',

    components: { ADetails },

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
            auction: {},
        };
    },

    created() {
        this.loadAuction();
    },

    methods: {
        async loadAuction() {
            this.auction = await getAuction(this.token.contract, this.token.tokenId);

            console.log('AUCTION', this.auction);
        },
    },
};
</script>

<style scoped></style>
