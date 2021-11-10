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
                    <!-- <div class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.symbol') }}:</span> ARTY
                    </div>
                    <div class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.royalty') }}:</span> 0.01%
                    </div>
                    <div class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.recipient') }}:</span>
                        <a target="_blank" href="#">0xfbB8...0a80</a>
                    </div>
                    <div class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.ipRights') }}:</span> {{ $t('nftdetail.notAvailable') }}
                    </div> -->
                    <div class="nftdetail_property_item">
                        <span>{{ $t('nftdetail.collection') }}:</span>
                        <nft-detail-collection :contract="info.contract" />
                    </div>
                </div>
            </template>
        </a-details>
        <a-details class="title_wrap">
            <template #label>
                <div class="nftdetail_details_wrap">
                    <app-iconset icon="about" /> {{ $t('nftdetail.about') }} {{ info.name }}
                </div>
            </template>
            <template>
                <div class="nftdetail_about">
                    {{ info.desc }}
                </div>
                <!-- <div class="nftdetail_socialBlock">
                    <a href="#" class="nftdetail_socialLink" target="_blank">
                        <app-iconset icon="web" />
                    </a>
                    <a href="#" class="nftdetail_socialLink" target="_blank">
                        <app-iconset icon="twitter" />
                    </a>
                    <a href="#" class="nftdetail_socialLink" target="_blank">
                        <app-iconset icon="telegram" />
                    </a>
                    <a href="#" class="nftdetail_socialLink" target="_blank">
                        <app-iconset icon="discord" />
                    </a>
                </div> -->
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
                        <!-- <a href="#" target="_blank">0x1DaD...79B9</a> -->
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
    },
};
</script>

<style></style>
