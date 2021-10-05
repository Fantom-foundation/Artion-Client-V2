<template>
    <div class="nfttradehistorygrid">
        <div class="nfttradehistorygrid_header">
            <div class="nfttradehistorygrid_title">
                Trade History
            </div>
            <div class="nfttradehistorygrid_filter">
                <trade-history-switcher @filter-switch="currentComponent = $event" />
            </div>
        </div>
        <div class="nfttradehistorygrid_histories">
            <component :is="currentComponent" />
        </div>
    </div>
</template>
<script>
import TradeHistorySwitcher from '@/modules/nfts/components/TradeHistorySwitcher/TradeHistorySwitcher';
import NftTradeGrid from '@/modules/nfts/components/NftTradeGrid/NftTradeGrid';
import NftHistoryGrid from '@/modules/nfts/components/NftHistoryGrid/NftHistoryGrid';
export default {
    name: 'NftTradeHistoryGrid',
    components: { TradeHistorySwitcher, NftTradeGrid, NftHistoryGrid },
    data() {
        return {
            currentComponent: 'NftHistoryGrid',
        };
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
