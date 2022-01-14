<template>
    <div class="accountactivity">
        <h1 class="not-visible" data-focus>{{ $t('page.accountActivity.title') }}</h1>

        <NftItemActivityFilter v-model="filters" />
        <NftItemActivityFilterChips v-show="!isObjectEmpty(filters)" v-model="filters" />

        <account-activity-grid :filter="filters" :user-address="userAddress" />
    </div>
</template>

<script>
import AccountActivityGrid from '@/modules/account/components/AccountActivityGrid/AccountActivityGrid.vue';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';
import NftItemActivityFilter from '@/modules/nfts/components/NftItemActivityFilter/NftItemActivityFilter';
import NftItemActivityFilterChips from '@/modules/nfts/components/NftItemActivityFilterChips/NftItemActivityFilterChips';
import { isObjectEmpty } from 'fantom-vue-components/src/utils';

export default {
    name: 'AccountActivity',

    components: { AccountActivityGrid, NftItemActivityFilter, NftItemActivityFilterChips },

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            filters: {},
        };
    },

    mounted() {
        focusElem(this.$el);
    },

    methods: {
        isObjectEmpty,
    },
};
</script>

<style lang="scss">
.accountactivity {
    display: flex;
    flex-direction: column;
    gap: var(--f-spacer-3);

    .accountactivityfilter {
        max-width: 320px;
    }
}
</style>
