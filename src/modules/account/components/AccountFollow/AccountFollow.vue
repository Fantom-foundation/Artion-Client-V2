<template>
    <div class="accountfollow">
        <div class="accountfollow_btn" v-if="!isItMe">
            <a-button
                :loading="loading"
                tabindex="0"
                :label="label"
                @keyup.enter.space="onClick"
                @click.native="onClick"
                size="small"
            />
        </div>
        <div
            class="accountfollow_followers"
            tabindex="0"
            @keyup.enter.space="showFollowersList"
            @click="showFollowersList"
        >
            <b>{{ followersCounter }}</b>
            {{ $t('accountfollow.followers') }}
        </div>
        <div
            class="accountfollow_following"
            tabindex="0"
            @keyup.enter.space="showFollowingList"
            @click="showFollowingList"
        >
            <b>{{ followingCounter }}</b>
            {{ $t('accountfollow.following') }}
        </div>

        <account-follow-window
            ref="accountFollowWindow"
            :title="title"
            :user-address="userAddress"
            :is-followers="isFollowers"
        />
    </div>
</template>

<script>
import AButton from '@/common/components/AButton/AButton.vue';
import AccountFollowWindow from '@/modules/account/components/AccountFollowWindow/AccountFollowWindow.vue';
import { getUserFollowers, getUserFollowing } from '@/modules/account/queries/subscription.js';
import { followUser, unFollowUser } from '@/modules/account/mutations/subscription.js';
import { getBearerToken, signIn } from '@/modules/account/auth.js';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { eventBusMixin } from 'fantom-vue-components/src/mixins/event-bus.js';
import { toInt } from '@/utils/big-number.js';
import { mapState } from 'vuex';
export default {
    name: 'AccountFollow',

    components: { AButton, AccountFollowWindow },

    mixins: [eventBusMixin],

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            label: this.$t('accountfollow.follow'),
            loading: false,
            isFollwed: false,
            followersCounter: 0,
            followingCounter: 0,
            isFollowers: true,
            title: '',
        };
    },

    //  created() {
    //      this.init();
    //  },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),

        isItMe() {
            return this.walletAddress === this.userAddress;
        },
    },

    watch: {
        userAddress: {
            handler: function(newValue, oldValue) {
                if (newValue !== oldValue) this.init();
            },
            immediate: true,
        },
    },

    methods: {
        async init() {
            let followers = await getUserFollowers(this.userAddress, { first: 20 });
            let following = await getUserFollowing(this.userAddress, { first: 1 });
            this.followersCounter = toInt(followers.totalCount);
            this.followingCounter = toInt(following.totalCount);
            this.isIFollowed(followers);
        },

        isIFollowed(value) {
            this.isFollwed = value.edges.find(item => item.node.follower === this.walletAddress);
            this.isFollwed
                ? (this.label = this.$t('accountfollow.unFollow'))
                : (this.label = this.$t('accountfollow.follow'));
        },

        async checkWalletConnection() {
            if (!this.$wallet.connected) {
                const payload = {};
                this._eventBus.emit('show-wallet-picker', payload);
                await payload.promise;
            }
        },

        async onClick() {
            let ok = true;
            await this.checkWalletConnection();
            if (!getBearerToken()) {
                ok = await signIn();
            }
            if (ok) {
                this.loading = true;
                if (!this.isFollwed) {
                    await followUser(this.userAddress);
                    this.followersCounter++;
                    this.isFollwed = true;
                    this.label = this.$t('accountfollow.unFollow');
                    notifications.add({
                        type: 'success',
                        text: this.$t('accountfollow.subscribed'),
                    });
                } else {
                    await unFollowUser(this.userAddress);
                    this.isFollwed = false;
                    if (this.followersCounter > 0) this.followersCounter--;
                    this.label = this.$t('accountfollow.follow');
                    notifications.add({
                        type: 'success',
                        text: this.$t('accountfollow.unsubscribed'),
                    });
                }
                this.loading = false;
            } else {
                this.$notifications.add({
                    type: 'error',
                    text: 'Some problems',
                });
            }
        },

        showFollowersList() {
            if (this.followersCounter > 0) {
                this.title = this.$t('accountfollow.follows');
                this.isFollowers = true;
                this.$refs.accountFollowWindow.show();
            }
        },

        showFollowingList() {
            if (this.followingCounter > 0) {
                this.title = this.$t('accountfollow.followings');
                this.isFollowers = false;
                this.$refs.accountFollowWindow.show();
            }
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
