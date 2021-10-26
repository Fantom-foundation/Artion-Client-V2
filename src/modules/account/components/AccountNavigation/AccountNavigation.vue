<template>
    <nav class="accountnavigation">
        <ul class="accountnavigation_list">
            <li v-for="item in dNavigation" :key="`accnav_${item.routeName}`" class="accountnavigation_item">
                <router-link :to="{ name: item.routeName, params: item.routeParams || {}, query: { ...filters } }">
                    <app-iconset :icon="item.icon" size="24px" />{{ item.label }}
                    <span v-if="'counter' in item" class="accountnavigation_counter">{{ item.counter }}</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'AccountNavigation',

    props: {
        navigation: {
            type: Array,
            default() {
                return [];
            },
        },

        filters: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            dNavigation: this.navigation,
        };
    },

    watch: {
        navigation(value) {
            this.dNavigation = value;
        },
    },

    methods: {
        updateCounter(routeName, count) {
            const idx = this.dNavigation.findIndex(item => item.routeName === routeName);

            if (idx > -1) {
                this.$set(this.dNavigation, idx, { ...this.dNavigation[idx], counter: count });
            }
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
