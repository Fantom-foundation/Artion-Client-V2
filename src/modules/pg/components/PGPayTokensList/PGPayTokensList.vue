<template>
    <div class="pgpaytokenslist">
        <div class="pgpaytokenslist_token" v-for="token in tokens" :key="`ptl_${token.address}`">
            <span class="pgpaytokenslist_token_symbol">
                <img :src="token.img" :alt="token.label" /> <span>{{ token.label }}</span>
            </span>
            <span class="pgpaytokenslist_token_price">
                {{ formatTokenValue(token.tokenPrice, token.decimals) }}
            </span>
        </div>
    </div>
</template>

<script>
import { formatTokenValue } from '@/utils/formatters.js';

export default {
    name: 'PGPayTokensList',

    props: {
        tokens: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    methods: {
        formatTokenValue,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
