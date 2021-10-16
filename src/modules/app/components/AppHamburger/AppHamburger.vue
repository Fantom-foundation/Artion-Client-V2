<template>
    <div class="burger" :class="{ active: dValue }" @click="toggleBurger"><span></span></div>
</template>
<script>
export default {
    name: 'AppHamburger',
    data() {
        return {
            dValue: false,
        };
    },

    watch: {
        dValue(_value) {
            this.$emit('switched', _value);
        },
        $route() {
            this.dValue = false;
        },
    },

    methods: {
        toggleBurger() {
            this.dValue = !this.dValue;
        },
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
