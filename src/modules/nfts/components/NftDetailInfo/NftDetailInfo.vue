<template>
    <a-details-group class="nftdetail_info" rounded>
        <a-details>
            <template #label>
                <div class="nftdetail_details_wrap">
                    <app-iconset icon="property" /> {{ $t('nftdetail.properties') }}
                </div>
            </template>
            <template>
                <div class="nftdetail_property">
                    <div class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.symbol') }}:</span> {{ info.symbol }}
                    </div>
                    <div v-if="info.royalty" class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.royalty') }}:</span> {{ info.royalty / 100 }}%
                    </div>
                    <div v-if="info.feeRecipientUser" class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.recipient') }}:</span>
                        <router-link :to="{ name: 'account', params: { address: info.feeRecipientUser.address } }">
                            <a-address
                                :address="info.feeRecipientUser.address"
                                :name="info.feeRecipientUser.username"
                                :image="info.feeRecipientUser.avatarThumb"
                            />
                        </router-link>
                    </div>
                    <div class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.ipRights') }}:</span>
                        <a v-if="info.ipRights" :href="info.ipRights">{{ info.ipRights }}</a>
                        <span v-else>{{ $t('nftdetail.notAvailable') }}</span>
                    </div>
                    <div class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.collection') }}:</span>
                        <nft-detail-collection :collection="info.collection" />
                    </div>
                </div>
            </template>
        </a-details>
        <a-details class="title_wrap" v-if="info.collection">
            <template #label>
                <div class="nftdetail_details_wrap">
                    <app-iconset icon="about" /> {{ $t('nftdetail.about') }} {{ info.collection.name }}
                </div>
            </template>
            <template>
                <div class="nftdetail_about">
                    {{ info.collection.description }}
                </div>
                <div class="nftdetail_socialBlock">
                    <a
                        v-if="info.collection.site"
                        :href="info.collection.site"
                        class="nftdetail_socialLink"
                        target="_blank"
                    >
                        <app-iconset icon="web" />
                    </a>
                    <a
                        v-if="info.collection.twitter"
                        :href="info.collection.twitter"
                        class="nftdetail_socialLink"
                        target="_blank"
                    >
                        <app-iconset icon="twitter" />
                    </a>
                    <a
                        v-if="info.collection.telegram"
                        :href="info.collection.telegram"
                        class="nftdetail_socialLink"
                        target="_blank"
                    >
                        <app-iconset icon="telegram" />
                    </a>
                    <a
                        v-if="info.collection.discord"
                        :href="info.collection.discord"
                        class="nftdetail_socialLink"
                        target="_blank"
                    >
                        <app-iconset icon="discord" />
                    </a>
                    <a
                        v-if="info.collection.medium"
                        :href="info.collection.medium"
                        class="nftdetail_socialLink"
                        target="_blank"
                    >
                        <app-iconset icon="medium" />
                    </a>
                    <a
                        v-if="info.collection.instagram"
                        :href="info.collection.instagram"
                        class="nftdetail_socialLink"
                        target="_blank"
                    >
                        <app-iconset icon="instagram" />
                    </a>
                </div>
            </template>
        </a-details>
        <a-details>
            <template #label>
                <div class="nftdetail_details_wrap"><app-iconset icon="chain" />{{ $t('nftdetail.chainInfo') }}</div>
            </template>
            <template>
                <div class="nftdetail_chainBlock">
                    <div class="nftdetail_chainLine">
                        <span>{{ $t('nftdetail.collection') }}</span>
                        <router-link
                            :to="{ name: 'explore', query: { collections: this.$route.params.tokenContract } }"
                        >
                            <f-ellipsis
                                :text="this.$route.params.tokenContract"
                                :fixed-chars-count="7"
                                overflow="middle"
                            />
                        </router-link>
                    </div>
                    <div class="nftdetail_chainLine">
                        <span>{{ $t('nftdetail.tokenId') }}</span>
                        <span>{{ toInt(info.tokenId) }} / {{ info.tokenId }}</span>
                    </div>
                    <div class="nftdetail_chainLine">
                        <span>{{ $t('nftdetail.network') }}</span>
                        <span>{{ $t('nftdetail.fantomOpera') }}</span>
                    </div>
                    <div class="nftdetail_chainLine">
                        <span>{{ $t('nftdetail.chainId') }}</span>
                        <span>250</span>
                    </div>
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
import { toInt } from '@/utils/big-number.js';
import AAddress from '@/common/components/AAddress/AAddress';
export default {
    name: 'NftDetailInfo',

    props: {
        info: {
            type: Object,
            required: true,
        },
    },

    components: {
        ADetailsGroup,
        ADetails,
        NftDetailCollection,
        FEllipsis,
        AAddress,
    },

    methods: {
        toInt,
    },
};
</script>

<style></style>
