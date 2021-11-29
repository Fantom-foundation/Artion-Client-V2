<template>
    <f-form class="wrapstationform">
        <a-b-price-field
            ref="priceFieldFrom"
            :value="value"
            :token="tokenFrom"
            :balance="tokenFrom.balance"
            :max-balance="tokenFrom.maxBalance"
            validate
            field-size="large"
            name="aaa"
            class="input-w100"
            @input="onTokenFromInput"
        />
        <div class="center-h mat-5 mab-3">
            <f-button
                secondary
                @click.native="onSwapButtonClick"
                :aria-label="$t('wrapstationform.swapTokens')"
                :data-tooltip="$t('wrapstationform.swapTokens')"
                round
                class="btn-grey"
            >
                <app-iconset size="24px" icon="swap" />
            </f-button>
        </div>
        <a-b-price-field
            :value="value"
            :token="tokenTo"
            :balance="tokenTo.balance"
            field-size="large"
            class="input-w100"
            @input="onTokenToInput"
        />

        <div class="center-h mat-5">
            <a-button type="submit" size="large" :loading="txStatus === 'pending'" @click.native="onWrapButtonClick">
                {{ buttonLabel }}
            </a-button>
        </div>

        <a-sign-transaction :tx="tx" @transaction-status="onTransactionStatus" />
    </f-form>
</template>

<script>
import ABPriceField from '@/common/components/ABPriceField/ABPriceField.vue';
import { WFTMContract } from '@/common/constants/pay-tokens.js';
import { getPayTokenWithPrice } from '@/utils/pay-tokens.js';
import { getFTMBalance } from '@/modules/wallet/queries/ftm-balance.js';
import { getErc20TokenBalance } from '@/modules/wallet/queries/erc20-token-balance.js';
import { bToTokenValue, toBigNumber, toHex } from '@/utils/big-number.js';
import AButton from '@/common/components/AButton/AButton.vue';
import contracts from '@/utils/wftm-utils.js';
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';

export default {
    name: 'WrapStationForm',

    components: { ASignTransaction, AButton, ABPriceField },

    props: {
        walletAddress: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            ftmToken: {},
            wftmToken: {},
            tokenFrom: { label: 'FTM' },
            tokenTo: { label: 'wFTM' },
            value: '',
            tx: {},
            txStatus: '',
            isMaxValue: false,
        };
    },

    computed: {
        wrap() {
            return this.tokenFrom.label === 'FTM';
        },

        buttonLabel() {
            return this.wrap ? this.$t('wrapstationform.wrap') : this.$t('wrapstationform.unwrap');
        },
    },

    watch: {
        walletAddress(value) {
            if (value) {
                this.setTokens();
            }
        },
    },

    created() {
        if (!this.walletAddress) {
            throw new Error('No user address provided');
        }

        this.setTokens();
    },

    methods: {
        async setTokens() {
            const wftmToken = await getPayTokenWithPrice(WFTMContract);

            this.wftmToken = {
                decimals: wftmToken.decimals,
                price: wftmToken.origPrice,
                priceDecimals: wftmToken.priceDecimals,
                label: wftmToken.label,
            };

            this.ftmToken = {
                ...this.wftmToken,
                label: 'FTM',
            };

            await this.setBalances();

            this.tokenFrom = this.ftmToken;
            this.tokenTo = this.wftmToken;
        },

        async setBalances() {
            const data = await Promise.all([
                getFTMBalance(this.walletAddress),
                getErc20TokenBalance(this.walletAddress, WFTMContract),
            ]);

            this.ftmToken.balance = data[0];
            this.wftmToken.balance = data[1];

            this.ftmToken.maxBalance = toHex(
                toBigNumber(this.ftmToken.balance).minus(bToTokenValue(0.5, this.ftmToken.decimals))
            );
            this.wftmToken.maxBalance = this.wftmToken.balance;
        },

        setTx(type) {
            const token = this.tokenFrom;
            const amount = this.isMaxValue ? token.maxBalance : toHex(bToTokenValue(this.value, token.decimals));
            let tx = null;

            if (type === 'wrap') {
                tx = contracts.defiWrapFtm(WFTMContract, amount);
                tx._code = 'wrap';
            } else {
                tx = contracts.defiUnwrapFtm(WFTMContract, amount);
                tx._code = 'unwrap';
            }

            this.tx = tx;
        },

        swapTokens() {
            const h = this.tokenTo;
            this.tokenTo = this.tokenFrom;
            this.tokenFrom = h;

            this.$nextTick(() => {
                this.$refs.priceFieldFrom.onInput(this.value);
            });
        },

        onTokenFromInput(data) {
            this.value = data.value;
            this.isMaxValue = data.max;
        },

        onTokenToInput(data) {
            this.value = data.value;
        },

        onSwapButtonClick() {
            this.swapTokens();
        },

        onWrapButtonClick() {
            if (this.$refs.priceFieldFrom.isValid() && this.value) {
                if (this.wrap) {
                    this.setTx('wrap');
                } else {
                    this.setTx('unwrap');
                }
            }
        },

        /**
         * @param {TransactionStatus} payload
         */
        onTransactionStatus(payload) {
            const txCode = payload.code;
            this.txStatus = payload.status;

            if (this.txStatus === 'success') {
                // this.setBalances();

                this.$notifications.add({
                    type: 'success',
                    text:
                        txCode === 'wrap'
                            ? this.$t('wrapstationform.wrapSuccess')
                            : this.$t('wrapstationform.unwrapSuccess'),
                });
            }

            this.$emit('transaction-status', payload);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
