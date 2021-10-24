<template>
    <div class="nftdirectoffersgrid">
        <f-data-grid
            infinite-scroll
            strategy="remote"
            no-header
            max-height="400px"
            sticky-head
            class="agrid nfttmpgrid"
            :items="items"
            :columns="columns"
            :total-items="totalItems"
            :per-page="perPage"
            @change="_onGridPageChange"
        >
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
            <template #column-actions="{ item }">
                <template v-if="!isExpired(item)">
                    <a-button
                        v-if="userCreatedToken"
                        :loading="txStatus === 'pending'"
                        label="Accept"
                        @click.native="onAcceptButtonClick(item)"
                    />
                    <a-button
                        v-else-if="compareAddresses(item.proposedBy, walletAddress)"
                        :loading="txStatus === 'pending'"
                        label="Withdraw"
                        @click.native="onWithdrawButtonClick(item)"
                    />
                </template>
            </template>
        </f-data-grid>
    </div>
</template>
<script>
import FDataGrid from 'fantom-vue-components/src/components/FDataGrid/FDataGrid.vue';
import { getTokenOffers } from '@/modules/nfts/queries/token-offers.js';
import dayjs from 'dayjs';
import { dataPageMixin } from '@/common/mixins/data-page.js';
import ATokenValue from '@/common/components/ATokenValue/ATokenValue.vue';
import AAddress from '@/common/components/AAddress/AAddress.vue';
import { mapState } from 'vuex';
import AButton from '@/common/components/AButton/AButton.vue';
import { compareAddresses } from '@/utils/address.js';

export default {
    name: 'NftDirectOffersGrid',

    components: { AButton, AAddress, ATokenValue, FDataGrid },

    mixins: [dataPageMixin],

    props: {
        token: {
            type: Object,
            default() {
                return {};
            },
        },
        userCreatedToken: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            columns: [
                {
                    name: 'proposedBy',
                    label: 'From',
                    width: '100px',
                },
                {
                    name: 'unitPrice',
                    label: 'Price',
                },
                {
                    name: 'deadline',
                    label: 'Expires',
                    formatter(value) {
                        return dayjs(value).format('DD.MM.YYYY HH:mm');
                    },
                },
                {
                    name: 'actions',
                },
            ],
            txStatus: '',
        };
    },

    computed: {
        ...mapState('wallet', {
            walletAddress: 'account',
        }),
    },

    watch: {
        token: {
            handler(value) {
                if (value.contract) {
                    this.loadOffers();
                }
            },
            immediate: true,
        },

        /*walletAddress() {
            this.loadOffers();
        },*/
    },

    methods: {
        async loadPage(pagination = { first: this.perPage }) {
            const { token } = this;

            const offers = await getTokenOffers(token.contract, token.tokenId, pagination);

            console.log(offers);

            return offers;
        },

        async loadOffers() {
            await this._loadPage();
        },

        isExpired(token) {
            if (!token.closed) {
                const now = dayjs();
                const deadline = dayjs(token.deadline);

                return deadline.diff(now) <= 0;
            }

            return true;

            /*console.log('isExpired', token);
            return false;*/
        },

        onAcceptButtonClick(token) {
            console.log('onAcceptButtonClick', token);
            alert('Not implemented yew');
        },

        onWithdrawButtonClick(token) {
            console.log('onWithdrawButtonClick', token);
            alert('Not implemented yew');
        },

        compareAddresses,
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
