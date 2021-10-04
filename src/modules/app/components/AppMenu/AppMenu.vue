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
                    route: 'explore',
                    label: this.$t('navigation.explore'),
                },
                {
                    route: 'nft-create',
                    label: this.$t('navigation.create'),
                },
            ],
        };
    },
};
</script>
