<template>
    <a-details-group class="nftdetailinfo" rounded>
        <a-details class="nftdetailinfo_block tes-3">
            <template #label>
                <div class="nftdetail_details_wrap">
                    <h2><app-iconset icon="property" /> {{ $t('nftdetail.properties') }}</h2>
                </div>
            </template>
            <template>
                <div class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.symbol') }}:</span><span>{{ info.symbol }}</span>
                </div>
                <div v-if="info.royalty" class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.royalty') }}:</span><span>{{ info.royalty / 100 }}%</span>
                </div>
                <div v-if="info.feeRecipientUser" class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.recipient') }}:</span>
                    <router-link :to="{ name: 'account', params: { address: info.feeRecipientUser.address } }">
                        <a-address
                            :address="info.feeRecipientUser.address"
                            :name="info.feeRecipientUser.username"
                            :image="info.feeRecipientUser.avatarThumb"
                            is-account
                        />
                    </router-link>
                </div>
                <div class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.ipRights') }}:</span>
                    <a v-if="info.ipRights" :href="info.ipRights">{{ info.ipRights }}</a>
                    <span v-else>{{ $t('nftdetail.notAvailable') }}</span>
                </div>
                <div class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.collection') }}:</span>
                    <nft-detail-collection :collection="info.collection" />
                </div>
            </template>
        </a-details>

        <a-details class="nftdetailinfo_block tes-3" v-if="info.collection">
            <template #label>
                <div class="nftdetail_details_wrap">
                    <h2><app-iconset icon="about" /> {{ $t('nftdetail.about') }} {{ info.collection.name }}</h2>
                </div>
            </template>
            <template>
                <p>
                    {{ info.collection.description }}
                </p>
                <social-links :info="info.collection" />
            </template>
        </a-details>

        <a-details class="nftdetailinfo_block tes-3">
            <template #label>
                <div class="nftdetail_details_wrap">
                    <h2><app-iconset icon="chain" /> {{ $t('nftdetail.chainInfo') }}</h2>
                </div>
            </template>
            <template>
                <div class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.collection') }}</span>
                    <router-link :to="{ name: 'explore', query: { collections: this.$route.params.tokenContract } }">
                        <f-ellipsis :text="this.$route.params.tokenContract" :fixed-chars-count="7" overflow="middle" />
                    </router-link>
                </div>
                <div class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.tokenId') }}</span>
                    <span class="nftdetailinfo_tokenid">
                        <f-ellipsis :text="toBigNumber(info.tokenId).toString(10)" overflow="middle" />
                        <span>/</span>
                        <f-ellipsis :text="info.tokenId" overflow="middle" />
                    </span>
                </div>
                <div class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.network') }}</span>
                    <span>{{ $t('nftdetail.fantomOpera') }}</span>
                </div>
                <div class="nftdetailinfo_row">
                    <span>{{ $t('nftdetail.chainId') }}</span>
                    <span>250</span>
                </div>
            </template>
        </a-details>
    </a-details-group>
</template>

<script>
import ADetailsGroup from '@/common/components/ADetailsGroup/ADetailsGroup';
import ADetails from '@/common/components/ADetails/ADetails';
import NftDetailCollection from '@/modules/nfts/components/NftDetailCollection/NftDetailCollection.vue';
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import { toInt, toBigNumber } from '@/utils/big-number.js';
import AAddress from '@/common/components/AAddress/AAddress';
import SocialLinks from '@/modules/nfts/components/SocialLinks/SocialLinks';

export default {
    name: 'NftDetailInfo',

    props: {
        info: {
            type: Object,
            required: true,
        },
    },

    components: {
        SocialLinks,
        ADetailsGroup,
        ADetails,
        NftDetailCollection,
        FEllipsis,
        AAddress,
    },

    methods: {
        toInt,
        toBigNumber,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
