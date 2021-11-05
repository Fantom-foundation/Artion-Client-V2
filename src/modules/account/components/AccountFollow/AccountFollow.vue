<template>
    <div class="accountfollow">
        <div class="accountfollow_btn">
            <a-button :loading="loading" :label="label" @click.native="onClick" />
        </div>
        <div class="accountfollow_followers" @click="showFollowersList">
            <b>{{ followersCounter }}</b>
            {{ $t('accountfollow.followers') }}
        </div>
        <div class="accountfollow_following" @click="showFollowingList">
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
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { toInt } from '@/utils/big-number.js';
import { mapState } from 'vuex';
export default {
    name: 'AccountFollow',

    components: { AButton, AccountFollowWindow },

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

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    created() {
        this.init();
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

        async onClick() {
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
