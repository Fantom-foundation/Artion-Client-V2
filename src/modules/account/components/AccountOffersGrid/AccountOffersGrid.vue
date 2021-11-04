<template>
    <div class="accountoffersgrid">
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
import { getUserOffers } from '@/modules/account/queries/user-tokens-offers.js';

export default {
    name: 'AccountOffersGrid',

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
                    label: this.$t('accountoffersgrid.item'),
                },
                {
                    name: 'proposedBy',
                    label: this.$t('accountoffersgrid.from'),
                },
                {
                    name: 'unitPrice',
                    label: this.$t('accountoffersgrid.price'),
                },
                {
                    name: 'quantity',
                    label: this.$t('accountoffersgrid.qty'),
                },
                {
                    name: 'deadline',
                    label: this.$t('accountoffersgrid.date'),
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
                    this.loadOffers();
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
            let data = await getUserOffers(this.userAddress, pagination);
            console.log(data);
            return this.getOffersData(data);
        },

        getOffersData(value) {
            let offers = { edges: [], pageInfo: {} };
            let edges = { edges: [] };
            value.edges
                .filter(item => item.node.hasOffer)
                .forEach(item => {
                    offers.edges = edges.edges.concat(item.node.offers.edges);
                });
            return offers;
        },

        async loadOffers() {
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
