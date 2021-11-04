<template>
    <div class="accountactivity">
        <account-activity-filter v-model="filter" />
        <account-activity-grid :filter="filter" :user-address="userAddress" />
    </div>
</template>

<script>
import AccountActivityGrid from '@/modules/account/components/AccountActivityGrid/AccountActivityGrid.vue';
import AccountActivityFilter from '@/modules/account/components/AccountActivityFilter/AccountActivityFilter.vue';
export default {
    name: 'AccountActivity',

    components: { AccountActivityGrid, AccountActivityFilter },

    props: {
        userAddress: {
            type: String,
            default: '',
            required: true,
        },
    },

    data() {
        return {
            filter: '',
        };
    },
};
</script>

<style lang="scss">
.accountactivity {
    display: flex;
    flex-direction: column;
    gap: var(--f-spacer-4);

    .accountactivityfilter {
        max-width: 320px;
    }
}
</style>
