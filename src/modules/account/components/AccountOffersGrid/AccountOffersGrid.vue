<template>
    <div class="accountoffersgrid">
        <f-data-grid
            ref="grid"
            infinite-scroll
            strategy="remote"
            no-header
            sticky-head
            class="agrid nfttmpgrid"
            __max-height="400px"
            __infinite-scroll-root=".nfttmpgrid .fdatagrid_table"
            :caption="$t('page.accountOffers.title')"
            :items="items"
            :columns="columns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
        >
            <template #column-token="{ item }">
                <router-link
                    v-if="item.token !== null"
                    :to="{ name: 'nft-detail', params: { tokenContract: item.contract, tokenId: item.tokenId } }"
                >
                    <a-address :address="item.token.contract" :name="item.token.name" :image="item.token.imageThumb" />
                </router-link>
            </template>
            <template #column-proposedByUser="{ value }">
                <router-link :to="{ name: 'account', params: { address: value.address } }">
                    <a-address :address="value.address" :name="value.username" :image="value.avatarThumb" is-account />
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
                    name: 'proposedByUser',
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
                    label: this.$t('accountoffersgrid.deadline'),
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
            return await getUserOffers(this.userAddress, pagination);
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
