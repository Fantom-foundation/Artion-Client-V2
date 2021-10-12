<template>
    <div class="account">
        <!-- TMP -->
        <!-- <ul>
            <li><router-link :to="{ name: 'account-single-items' }">Single Items</router-link></li>
            <li><router-link :to="{ name: 'account-bundles' }">Bundles</router-link></li>
            <li><router-link :to="{ name: 'account-favorited' }">Favorited</router-link></li>
            <li><router-link :to="{ name: 'account-activity' }">Activity</router-link></li>
            <li><router-link :to="{ name: 'account-offers' }">Offers</router-link></li>
            <li><router-link :to="{ name: 'account-my-offers' }">My Offers</router-link></li>
        </ul> -->
        <div class="account_banner">
            <AUploadArea
                ><svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="pencil-alt"
                    class="svg-inline--fa fa-pencil-alt fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="currentColor"
                        d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
                    ></path></svg
            ></AUploadArea>
        </div>
        <div class="account_header">
            <div class="account_avatar">
                <AUploadArea
                    ><svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="pencil-alt"
                        class="svg-inline--fa fa-pencil-alt fa-w-16"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path
                            fill="currentColor"
                            d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
                        ></path></svg
                ></AUploadArea>
            </div>
            <div class="account_title">Unnamed</div>
            <div class="account_subtitle">
                <button :area-label="$t('account.copy')" :data-tooltip="$t('account.copy')">
                    0x2b45f2f1b5984a27eb100e6020eb5831dc287027
                </button>
            </div>
            <div class="account_join">Joined September 2021</div>
            <div class="account_btn">
                <AShareButton />
            </div>
        </div>
        <div class="account_nav nav">
            <ul class="nav_list">
                <li class="nav_item">
                    <router-link :to="{ name: 'account-single-items' }" class="nav_link">
                        <app-iconset icon="solid1" size="24px" />{{ $t('account.collected') }}
                        <span class="nav__counter">0</span></router-link
                    >
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'account-bundles' }" class="nav_link"
                        ><app-iconset icon="paint" size="24px" />{{ $t('account.created')
                        }}<span class="nav__counter">0</span></router-link
                    >
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'account-favorited' }" class="nav_link"
                        ><app-iconset icon="like" size="24px" />{{ $t('account.favorited')
                        }}<span class="nav__counter">0</span></router-link
                    >
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'account-activity' }" class="nav_link"
                        ><app-iconset icon="eyeslash" size="24px" />{{ $t('account.hidden')
                        }}<span class="nav__counter">0</span></router-link
                    >
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'account-offers' }" class="nav_link"
                        ><app-iconset icon="history" size="24px" />{{ $t('account.activity') }}</router-link
                    >
                </li>
                <li class="nav_item">
                    <router-link :to="{ name: 'account-my-offers' }" class="nav_link"
                        ><app-iconset icon="tag" size="24px" />{{ $t('account.offers')
                        }}<span class="nav__counter">0</span></router-link
                    >
                </li>
            </ul>
        </div>
        <div class="account_filterButton">
            <f-button @click.native="isSideClose = !isSideClose"
                >{{ $t('account.filter') }}
                <span v-if="filterNumber" class="account_filterButton_counter">{{ filterNumber }}</span></f-button
            >
        </div>
        <div class="account_content" :class="{ no_aside: isSideClose }">
            <aside class="account_sidebar" :class="{ close: isSideClose }">
                <header class="account_sidebar_header">
                    <div class="account_sidebar_wrap">
                        <button
                            :aria-label="$t('account.filters')"
                            :data-tooltip="$t('account.filters')"
                            @click="isSideClose = !isSideClose"
                        >
                            <span class="account_sidebar_label"
                                ><app-iconset size="24px" icon="filter" />{{ $t('account.filter') }}</span
                            >
                            <span class="account_sidebar_icon"><app-iconset icon="arrowright" size="24px"/></span>
                        </button>
                    </div>
                </header>
                <nft-filters v-model="filters" class="account_sidebar_filters" />
            </aside>
            <div class="account_view">
                <div class="account_view_filters">
                    <div class="account_view_filters_search">
                        <ASearchField field-size="large" placeholder="Search" />
                    </div>
                    <div class="account_view_filters_list">
                        <NftListFilters v-model="filters" />
                        <DensitySwitch />
                    </div>
                </div>
                <div class="account_view_chips">
                    <NftFilterChips v-model="filters" />
                </div>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import NftFilters from '@/modules/nfts/components/NftFilters/NftFilters.vue';
import AUploadArea from '@/common/components/AUploadArea/AUploadArea';
import AShareButton from '@/common/components/AShareButton/AShareButton';
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import ASearchField from '@/common/components/ASearchField/ASearchField';
import NftListFilters from '@/modules/nfts/components/NftListFilters/NftListFilters';
import DensitySwitch from '@/modules/nfts/components/DensitySwitch/DensitySwitch';
import NftFilterChips from '@/modules/nfts/components/NftFilterChips/NftFilterChips.vue';
export default {
    name: 'Account',
    components: {
        AUploadArea,
        AShareButton,
        AppIconset,
        NftFilters,
        ASearchField,
        NftListFilters,
        DensitySwitch,
        NftFilterChips,
    },
    data() {
        return {
            filters: {},
            isSideClose: true,
        };
    },
    computed: {
        filterNumber() {
            let size = 0;
            let key;
            for (key in this.filters) {
                size += this.filters[key].length;
            }
            return size;
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
