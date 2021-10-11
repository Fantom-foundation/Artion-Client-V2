<template>
    <nav class="appmenu flex gap-5">
        <router-link v-for="(item, index) in navigation" :key="`am_${index}`" :to="{ name: item.route }">
            {{ item.label }}
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'AppMenu',

    data() {
        return {
            navigation: [
                {
                    route: 'drop',
                    label: this.$t('navigation.drop'),
                },
                {
                    route: 'nfts',
                    label: this.$t('navigation.nfts'),
                },
                {
                    route: 'faq',
                    label: 'FAQ',
                },
            ],
        };
    },
};
</script>
