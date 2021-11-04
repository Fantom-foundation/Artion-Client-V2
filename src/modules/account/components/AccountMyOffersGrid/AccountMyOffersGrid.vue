<template>
    <div class="accountmyoffersgrid">
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            no-header
            max-height="400px"
            sticky-head
            class="agrid nfttmpgrid"
            infinite-scroll-root=".nfttmpgrid .fdatagrid_table"
            :items="items"
            :columns="columns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
        >
            <template #column-token="{ item }">
                <router-link
                    :to="{ name: 'nft-detail', params: { tokenContract: item.contract, tokenId: item.tokenId } }"
                >
                    <a-address
                        :owner="{
                            address: item.token.contract,
                            username: item.token.name,
                            avatarThumb: item.token.imageThumb,
                        }"
                    />
                </router-link>
            </template>
            <template #column-proposedBy="{ value }">
                <router-link :to="{ name: 'account', params: { address: value } }">
                    <a-address :address="value" />
                </router-link>
            </template>
            <template #column-unitPrice="{ item, value }">
                <a-token-value
                    :token="item.payToken"
                    :value="value"
                    :fraction-digits="2"
                    :use-placeholder="false"
                    no-symbol
                />
            </template>
            <template #column-quantity="{ value }">
                {{ transformQty(value) }}
            </template>
            <template #column-deadline="{ value }">
                {{ value }}
            </template>
        </f-data-grid>
    </div>
</template>

<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import { toInt } from '@/utils/big-number.js';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import { datetimeFormatter } from '@/utils/formatters.js';

export default {
    name: 'AccountMyOffersGrid',

    components: { FDataGrid, AAddress, ATokenValue },

    mixins: [dataPageMixin],

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            columns: [
                {
                    name: 'token',
                    label: this.$t('accountmyoffersgrid.item'),
                },
                {
                    name: 'unitPrice',
                    label: this.$t('accountmyoffersgrid.price'),
                },
                {
                    name: 'quantity',
                    label: this.$t('accountmyoffersgrid.qty'),
                },
                {
                    name: 'deadline',
                    label: this.$t('accountmyoffersgrid.date'),
                    formatter(value) {
                        return datetimeFormatter(value);
                    },
                },
            ],
        };
    },

    watch: {
        userAddress: {
            handler(value) {
                if (value) {
                    this.loadMyOffers();
                } else {
                    this.loading = true;
                }
            },
            immediate: true,
        },

        loading(value) {
            this.$emit('loading', value);
        },
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }) {
            console.log(pagination);
        },

        async loadMyOffers() {
            await this._loadPage();
        },

        transformQty(value) {
            if (!value) return '';
            return toInt(value);
        },

        update() {
            this.pageInfo = {};
            this.items = [];
            this.$nextTick(() => {
                this.$refs.grid.goToPageNum(1);
            });
        },
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
