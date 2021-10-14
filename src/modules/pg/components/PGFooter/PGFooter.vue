<template>
    <footer class="pg-footer">
        <router-link class="pg-footer__link" :to="{}">Terms and conditions</router-link>
        <router-link class="pg-footer__link" :to="{}">Privacy Policy</router-link>
    </footer>
</template>

<script>
export default {
    name: 'PGFooter',
};
</script>

<style lang="scss">
@use "style";
</style>
