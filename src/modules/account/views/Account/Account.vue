<template>
    <div class="account">
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
            <div class="account_title">{{ user.name || $t('account.unnamed') }}</div>
            <div class="account_subtitle">
                <f-copy-button :text="userAddress">
                    <template #button-content>
                        <f-ellipsis :text="userAddress" overflow="middle" />
                    </template>
                </f-copy-button>
            </div>
            <div class="account_join">Joined September 2021</div>
            <div class="account_btn">
                <AShareButton />
            </div>
        </div>

        <account-navigation ref="accountNavigation" :navigation="navigation" :filters="filters" />

        <div class="account_filterButton">
            <f-button @click.native="isSideClose = !isSideClose">
                {{ $t('account.filter') }}
                <span v-if="filterNumber" class="account_filterButton_counter">{{ filterNumber }}</span>
            </f-button>
        </div>
        <div class="account_content" :class="{ no_aside: isSideClose }">
            <aside class="account_sidebar" :class="{ close: isSideClose }">
                <!--                <header class="account_sidebar_header">
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
                <nft-filters v-model="filters" class="account_sidebar_filters" />-->
            </aside>
            <div class="account_view">
                <div class="account_view_filters">
                    <div class="account_view_filters_search">
                        <!--                        <ASearchField field-size="large" placeholder="Search" />-->
                    </div>
                    <div class="account_view_filters_list">
                        <!--                        <NftListFilters v-model="filters" />-->
                        <DensitySwitch />
                    </div>
                </div>
                <div class="account_view_chips">
                    <NftFilterChips v-model="filters" @chips-change="onChipsChange" />
                </div>
                <router-view :user-address="userAddress" />
            </div>
        </div>
    </div>
</template>

<script>
import AUploadArea from '@/common/components/AUploadArea/AUploadArea';
import AShareButton from '@/common/components/AShareButton/AShareButton';
// import NftFilters from '@/modules/nfts/components/NftFilters/NftFilters.vue';
// import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
// import ASearchField from '@/common/components/ASearchField/ASearchField';
// import NftListFilters from '@/modules/nfts/components/NftListFilters/NftListFilters';
import DensitySwitch from '@/modules/nfts/components/DensitySwitch/DensitySwitch';
import NftFilterChips from '@/modules/nfts/components/NftFilterChips/NftFilterChips.vue';
import { routeQueryMixin } from '@/common/mixins/route-query.js';
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import FCopyButton from 'fantom-vue-components/src/components/FCopyButton/FCopyButton.vue';
import { mapState } from 'vuex';
import { getUser } from '@/modules/account/queries/user.js';
import AccountNavigation from '@/modules/account/components/AccountNavigation/AccountNavigation.vue';
import { defer } from 'fantom-vue-components/src/utils';
import { getUserTokenCounters } from '@/modules/account/queries/user-token-counters.js';
import { toInt } from '@/utils/big-number.js';

export default {
    name: 'Account',

    mixins: [routeQueryMixin('filters')],

    components: {
        AccountNavigation,
        AUploadArea,
        AShareButton,
        // AppIconset,
        // NftFilters,
        // ASearchField,
        // NftListFilters,
        DensitySwitch,
        NftFilterChips,
        FEllipsis,
        FCopyButton,
    },

    data() {
        return {
            filters: {},
            isSideClose: true,
            filterNumber: 0,
            userAddress: this.$route.params.adddress,
            user: {},
            navigation: [
                {
                    routeName: 'account-single-items',
                    label: this.$t('account.collected'),
                    icon: 'solid1',
                    counter: 0,
                },
                {
                    routeName: 'account-created',
                    label: this.$t('account.created'),
                    icon: 'paint',
                    counter: 0,
                },
                {
                    routeName: 'account-favorited',
                    label: this.$t('account.favorited'),
                    icon: 'like',
                    counter: 0,
                },
                {
                    routeName: 'account-activity',
                    label: this.$t('account.hidden'),
                    icon: 'eyeslash',
                    counter: 0,
                },
                {
                    routeName: 'account-offers',
                    label: this.$t('account.activity'),
                    icon: 'history',
                },
                {
                    routeName: 'account-my-offers',
                    label: this.$t('account.offers'),
                    icon: 'tag',
                    counter: 0,
                },
            ],
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        walletAddress: {
            handler(value) {
                if (!this.userAddress) {
                    this.userAddress = this.$route.params.address || value;
                } else {
                    this.userAddress = value;
                }

                if (!this.userAddress) {
                    this.$router.push('/');
                } else {
                    this.loadUser(this.userAddress);

                    defer(() => {
                        this.updateTokenCounters();
                    }, 200);
                }
            },
            immediate: true,
        },
    },

    methods: {
        /**
         * @param {string} userAddress
         * @return {Promise<void>}
         */
        async loadUser(userAddress) {
            if (userAddress) {
                this.user = await getUser(userAddress);
            }
        },

        /**
         * @return {Promise<void>}
         */
        async updateTokenCounters() {
            const { accountNavigation } = this.$refs;
            const tokenCounters = await getUserTokenCounters(this.userAddress);

            if (!tokenCounters) {
                return;
            }

            if (tokenCounters.createdTokens) {
                accountNavigation.updateCounter('account-created', toInt(tokenCounters.createdTokens.totalCount));
            }
        },

        /**
         * @param {Array} chips
         */
        onChipsChange(chips) {
            this.filterNumber = chips.length;
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
