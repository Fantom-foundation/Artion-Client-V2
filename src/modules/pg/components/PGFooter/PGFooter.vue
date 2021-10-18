<template>
    <footer class="pg-footer">
        <router-link class="pg-footer__link" :to="{}">{{ $t('pgFooter.termsAndConditions') }}</router-link>
        <router-link class="pg-footer__link" :to="{}">{{ $t('pgFooter.privacy') }}</router-link>
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
