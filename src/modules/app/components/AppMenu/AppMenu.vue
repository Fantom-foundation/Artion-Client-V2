<template>
    <nav class="appmenu flex gap-5">
        <router-link v-for="(item, index) in navigation" :key="`am_${index}`" :to="{ name: item.route }">
            {{ item.label }}
        </router-link>
        <!--        <router-link :to="{ name: 'account', params: { address: '0x0F7594474Db81B82a80DE108044A837eA1E88EE0' } }">
            tmp
        </router-link>-->
    </nav>
</template>

<script>
export default {
    name: 'AppMenu',

    data() {
        return {
            navigation: [
                {
                    route: 'explore',
                    label: this.$t('navigation.explore'),
                },
                {
                    route: 'nft-create',
                    label: this.$t('navigation.create'),
                },
                {
                    route: 'pg',
                    label: 'PG',
                },
            ],
        };
    },
};
</script>
