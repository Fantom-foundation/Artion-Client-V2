<template>
    <a-window
        ref="window"
        :title="title"
        class="fwindow-width-5 accountfollowwindow"
        v-on="$listeners"
        @window-hide="update()"
    >
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            no-header
            max-height="400px"
            sticky-head
            class="agrid accountfollowwindow"
            infinite-scroll-root=".accountfollowwindow .fdatagrid_table"
            :items="items"
            :columns="columns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
            @row-click="onRowClick"
        >
            <template #column-token="{ item }">
                <router-link :to="{ name: 'account', params: { address: item.address } }">
                    <div class="accountfollowwindow_item">
                        <div class="accountfollowwindow_item_img">
                            <img :src="item.img || 'img/tmp/avatar.png'" alt="avatar" />
                        </div>
                        <div class="accountfollowwindow_item_data">
                            <span>{{ item.name || item.address }}</span>
                            <span><f-ellipsis :text="item.address" overflow="middle"/></span>
                        </div>
                    </div>
                </router-link>
            </template>
        </f-data-grid>
    </a-window>
</template>

<script>
import AWindow from '@/common/components/AWindow/AWindow.vue';
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import { getUserFollowers, getUserFollowing } from '@/modules/account/queries/subscription.js';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import { getImageThumbUrl } from '@/utils/url.js';
import { dataPageMixin } from '@/common/mixins/data-page.js';
export default {
    name: 'AccountFollowWindow',

    mixins: [dataPageMixin],

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },

        isFollowers: {
            type: Boolean,
            default: true,
            required: true,
        },

        title: {
            type: String,
            default: '',
        },
    },

    components: { AWindow, FDataGrid, FEllipsis },

    data() {
        return {
            columns: [
                {
                    name: 'token',
                    label: this.$t('accountoffersgrid.item'),
                },
            ],
        };
    },

    watch: {
        isFollowers: {
            async handler(value, oldValue) {
                if (value !== oldValue) {
                    if (this.items.length > 0) {
                        this.update();
                    } else {
                        await this.loadData();
                    }
                }
            },
            immediate: true,
        },
    },

    methods: {
        ...copyMethods(AWindow, ['show', 'hide', 'toggle'], 'window'),

        async loadPage(pagination = { first: this.perPage }) {
            const { userAddress } = this;
            if (this.isFollowers) {
                return await getUserFollowers(userAddress, pagination);
            } else {
                return await getUserFollowing(userAddress, pagination);
            }
        },

        async loadData() {
            await this._loadPage();
        },

        update() {
            this.pageInfo = {};
            this.items = [];
            // this.$nextTick(() => {
            //     this.$refs.grid.goToPageNum(1);
            // });
        },

        onRowClick() {
            this.$refs.window.hide();
        },

        _getItemsFromData(data) {
            return data.edges.map(edge => {
                let item = this.isFollowers ? edge.node.followerUser : edge.node.followedUser;
                return {
                    img: getImageThumbUrl(item.avatarThumb),
                    name: item.username,
                    address: item.address,
                };
            });
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
