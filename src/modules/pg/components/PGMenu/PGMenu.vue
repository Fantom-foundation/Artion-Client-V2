<template>
    <nav class="appmenu flex gap-9">
        <router-link
            v-for="(item, index) in navigation"
            :key="`am_${index}`"
            :to="{ path: $route.path, hash: item.hash }"
        >
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
                    hash: 'drop',
                    label: this.$t('navigation.drop'),
                },
                {
                    hash: 'nfts',
                    label: this.$t('navigation.nfts'),
                },
                {
                    hash: 'faq',
                    label: 'FAQ',
                },
            ],
        };
    },
};
</script>
