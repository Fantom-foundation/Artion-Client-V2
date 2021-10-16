<template>
    <span class="walletbutton" :class="classes">
        <f-button secondary size="large" class="btn-grey" @click.native="onClick">
            <span v-if="wallet.avatar" class="walletbutton_avatar">
                <a-placeholder :content-loaded="!!wallet.avatar">
                    <img :src="wallet.avatar" alt="avatar" />
                </a-placeholder>
            </span>
            <span class="walletbutton_cont">
                <template v-if="loading">
                    <a-placeholder
                        :content-loaded="!!wallet.address"
                        replacement-text="0xc0ffee254729296a45a3885639AC7E10F9d54979"
                    >
                        {{ wallet.userName || wallet.address }}
                    </a-placeholder>
                    <a-placeholder :content-loaded="!!wallet.chain" :replacement-num-chars="8">
                        {{ wallet.chain }}
                    </a-placeholder>
                </template>
                <template v-else-if="!wallet.address">{{ $t('walletbutton.connectWallet') }}</template>
                <template v-else>
                    <div class="walletbutton_address">
                        <f-ellipsis
                            v-if="!wallet.userName"
                            :text="wallet.address"
                            overflow="middle"
                            :fixed-chars-count="4"
                        />
                        <template v-else>{{ wallet.userName }}</template>
                    </div>
                    <f-ellipsis :text="wallet.chain" class="walletbutton_chain" />
                </template>
            </span>
        </f-button>
    </span>
</template>

<script>
import FButton from 'fantom-vue-components/src/components/FButton/FButton.vue';
import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import APlaceholder from '@/common/components/APlaceholder/APlaceholder.vue';

export default {
    components: { FButton, FEllipsis, APlaceholder },

    name: 'WalletButton',

    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        wallet: {
            type: Object,
            default() {
                return {
                    address: '',
                    chain: '',
                    avatar: '',
                    userName: '',
                };
            },
        },
    },

    computed: {
        classes() {
            return {
                'walletbutton-notconnected': !this.loading && !this.wallet.address,
            };
        },
    },

    methods: {
        onClick() {
            if (!this.loading) {
                this.$emit('click');
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
