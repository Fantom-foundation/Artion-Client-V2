<template>
    <div class="account">
        <div class="account_banner">
            <AUploadArea
                :initial-preview="banner"
                @input="uploadUserBanner"
                :disabled="userAddress !== walletAddress"
            />
        </div>
        <div class="account_header">
            <div class="account_avatar">
                <AUploadArea
                    :initial-preview="avatar"
                    @input="uploadUserAvatar"
                    :disabled="userAddress !== walletAddress"
                />
            </div>
            <div class="account_title">{{ user.username || $t('account.unnamed') }}</div>
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
                        <DensitySwitch v-if="!isActivityPage" />
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
import { getUserFavoriteTokens } from '@/modules/account/queries/user-favorite-tokens.js';
import { getUserOwnershipTokens } from '@/modules/account/queries/user-ownership-tokens.js';
import { signIn, getBearerToken } from '@/modules/account/auth.js';
import { uploadUserFile } from '@/utils/upload.js';
import { getImageThumbUrl, getIPFSUrl } from '@/utils/url.js';
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
            avatar: null,
            banner: null,
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
                    routeName: 'account-hidden',
                    label: this.$t('account.hidden'),
                    icon: 'eyeslash',
                    counter: 0,
                },
                {
                    routeName: 'account-activity',
                    label: this.$t('account.activity'),
                    icon: 'history',
                },
                {
                    routeName: 'account-offers',
                    label: this.$t('account.offers'),
                    icon: 'tag',
                    counter: 0,
                },
                {
                    routeName: 'account-my-offers',
                    label: this.$t('account.myOffers'),
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

        isActivityPage() {
            return this.$route.matched.some(
                ({ name }) => name === 'account-activity' || name === 'account-offers' || name === 'account-my-offers'
            );
        },
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
                    this.update();
                }
            },
            immediate: true,
        },

        $route(value) {
            if (!value.params.address) {
                this.userAddress = this.walletAddress;
                this.update();
            }
        },

        userAddress: {
            handler(value) {
                if (value === this.$route.params.address) {
                    this.navigation = this.navigation.map(item => {
                        return { ...item, routeParams: { address: value } };
                    });
                }
            },
            immediate: true,
        },
    },

    methods: {
        update() {
            this.loadUser(this.userAddress);

            defer(() => {
                this.updateTokenCounters();
                this.updateFavoriteCounters();
                this.updateOwnershipCounters();
            }, 200);
        },

        async checkUserSingIn() {
            let ok = true;
            if (!getBearerToken()) {
                ok = await signIn();
            }

            return ok;
        },

        async uploadUserAvatar(files) {
            let isSignIn = await this.checkUserSingIn();
            if (isSignIn) {
                uploadUserFile(files, 'avatar');
            }
        },

        async uploadUserBanner(files) {
            let isSignIn = await this.checkUserSingIn();
            if (isSignIn) {
                uploadUserFile(files, 'banner');
            }
        },

        /**
         * @param {string} userAddress
         * @return {Promise<void>}
         */
        async loadUser(userAddress) {
            if (userAddress) {
                this.user = await getUser(userAddress);
                this.avatar = this.user.avatarThumb ? getImageThumbUrl(this.user.avatarThumb) : '';
                this.banner = this.user.banner ? getIPFSUrl(this.user.banner) : '';
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
         * @return {Promise<void>}
         */
        async updateFavoriteCounters() {
            const { accountNavigation } = this.$refs;
            const favoriteCounters = await getUserFavoriteTokens(this.userAddress);
            if (!favoriteCounters) {
                return;
            }

            if (favoriteCounters.edges.length) {
                accountNavigation.updateCounter('account-favorited', toInt(favoriteCounters.totalCount));
            }
        },

        /**
         * @return {Promise<void>}
         */
        async updateOwnershipCounters() {
            const { accountNavigation } = this.$refs;
            const favoriteCounters = await getUserOwnershipTokens(this.userAddress);
            if (!favoriteCounters) {
                return;
            }

            if (favoriteCounters.edges.length) {
                accountNavigation.updateCounter('account-single-items', toInt(favoriteCounters.totalCount));
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
