<template>
    <div class="nftdetail">
        <div>NftDetail {{ this.$route.params.id }}</div>
        <a-details>
            <template #label>Price History</template>
            PriceHistory component
        </a-details>
        <a-details>
            <template #label>Listings</template>
            Listings component
        </a-details>
        <a-details>
            <template #label>Direct Offers</template>
            DirectOffers component
        </a-details>

        <br />
        <a-details-group rounded>
            <a-details>
                <template #label>About Rarity Names</template>
                foo
            </a-details>
            <a-details>
                <template #label>Chain Info</template>
                foo
            </a-details>
        </a-details-group>
    </div>
</template>

<script>
import ADetailsGroup from '@/common/components/ADetailsGroup/ADetailsGroup.vue';
import ADetails from '@/common/components/ADetails/ADetails.vue';

export default {
    name: 'NftDetail',
    components: { ADetails, ADetailsGroup },
};
</script>
