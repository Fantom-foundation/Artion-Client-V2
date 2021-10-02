<template>
    <div class="nftdetail container">
        <div class="nftdetail_main">
            <div class="nftdetail_media">
                <div class="nftdetail_img">
                    <img src="/img/tmp/details-img.jpg" alt="details-img" />
                </div>
            </div>
            <div class="nftdetail_product">
                <div class="nftdetail_infoWrap">
                    <div class="nftdetail_category">Spooky Skeletoons</div>
                    <div class="nftdetail_name">
                        <h1>#4676 Spine-Chilling Hamburger</h1>
                    </div>
                    <div class="nftdetail_description">
                        Skull that gives you Alerts and updates to every projects on Fantom!
                    </div>
                    <div class="nftdetail_status">
                        <div class="nftdetail_owner">
                            <div class="nftdetail_owner_avatar">
                                <img src="/img/tmp/owner-avatar.png" alt="avatar" />
                            </div>
                            {{ $t('nftdetail.owned') }}
                            <a href="#" class="nftdetail_owner_account">0xe1a6...18D2</a>
                        </div>
                        <div class="nftdetail_views">
                            <app-iconset icon="view" />
                            3 {{ $t('nftdetail.views') }}
                        </div>
                        <div class="nftdetail_favorites">
                            <app-iconset icon="like" />
                            {{ $t('nftdetail.favorites') }}
                        </div>
                    </div>
                    <div class="nftdetail_currentPrice">
                        <div class="nftdetail_currentPrice_item nftdetail_currentPrice_label">
                            {{ $t('nftdetail.currentPrice') }}
                        </div>
                        <div class="nftdetail_currentPrice_item nftdetail_currentPrice_wrap">
                            <div class="nftdetail_currentPrice_logo"><img src="/img/tmp/ftm.png" alt="FTM" /></div>
                            <div class="nftdetail_currentPrice_num">5000</div>
                            <div class="nftdetail_currentPrice_usd">($71644.838)</div>
                        </div>
                        <div class="nftdetail_currentPrice_item nftdetail_currentPrice_btn">
                            <f-button>{{ $t('nftdetail.buyNow') }}</f-button>
                        </div>
                    </div>
                    <a-share-button />
                </div>
            </div>
            <div class="nftdetail_data">
                <a-details>
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            {{ $t('nftdetail.saleEndsIn') }} 3 Days (06.10.2021, 17:03:15)
                        </div>
                    </template>
                    <template>
                        <div class="nftdetail_sail">
                            <div class="nftdetail_sail_item">
                                {{ $t('nftdetail.reservePrice') }}:&nbsp;<img
                                    src="/img/tmp/ftm.png"
                                    alt="FTM"
                                />&nbsp;100
                            </div>
                            <div class="nftdetail_sail_item">
                                {{ $t('nftdetail.highestBid') }}:&nbsp;<img src="/img/tmp/ftm.png" alt="FTM" />&nbsp;100
                            </div>
                            <div class="nftdetail_sail_item nftdetail_sail_btn">
                                <f-button>{{ $t('nftdetail.placeBid') }}</f-button>
                            </div>
                        </div>
                    </template>
                </a-details>
                <a-details>
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="graf" /> {{ $t('nftdetail.priceHistory') }}
                        </div>
                    </template>
                    PriceHistory component
                </a-details>
                <a-details>
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="tag" /> {{ $t('nftdetail.listings') }}
                        </div>
                    </template>
                    Listings component
                </a-details>
                <a-details>
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="list" /> {{ $t('nftdetail.directOffers') }}
                        </div>
                    </template>
                    DirectOffers component
                </a-details>
            </div>
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
                            </div>
                            <div class="nftdetail_property_item">
                                <span>{{ $t('nftdetail.collection') }}:</span> {{ $t('nftdetail.nftCollection') }}
                            </div>
                        </div>
                    </template>
                </a-details>
                <a-details class="title_wrap">
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="about" /> {{ $t('nftdetail.about') }} Rarity Names
                        </div>
                    </template>
                    <template>
                        <div class="nftdetail_about">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque, perspiciatis animi eum
                            consequuntur temporibus nulla, iusto minus cumque suscipit architecto quasi! Iusto, expedita
                            quos nostrum dolores adipisci deleniti fugit!
                        </div>
                        <div class="nftdetail_socialBlock">
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
                        </div>
                    </template>
                </a-details>
                <a-details>
                    <template #label>
                        <div class="nftdetail_details_wrap">
                            <app-iconset icon="chain" />{{ $t('nftdetail.chainInfo') }}
                        </div>
                    </template>
                    <template>
                        <div class="nftdetail_chainBlock">
                            <div class="nftdetail_chainLine">
                                <span>{{ $t('nftdetail.collection') }}</span>
                                <a href="#" target="_blank">0x1DaD...79B9</a>
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
        </div>
        <div class="nftdetail_filter">
            Trade/Transfer Component
        </div>
        <div class="nftdetail_collection">
            <a-details>
                <template #label>
                    <div class="nftdetail_details_wrap">
                        <app-iconset icon="collection" /> {{ $t('nftdetail.fromCollection') }}
                    </div>
                </template>
                <template>
                    <nft-list />
                </template>
            </a-details>
        </div>
    </div>
</template>

<script>
import ADetailsGroup from '@/common/components/ADetailsGroup/ADetailsGroup';
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import ADetails from '@/common/components/ADetails/ADetails';
import AShareButton from '@/common/components/AShareButton/AShareButton';
import NftList from '@/modules/nfts/components/NftList/NftList';

export default {
    name: 'NftDetail',
    components: { ADetails, ADetailsGroup, AppIconset, AShareButton, NftList },
};
</script>

<style lang="scss">
@use 'style';
</style>
