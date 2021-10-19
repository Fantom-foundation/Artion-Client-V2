<template>
    <footer class="pg-footer">
        <a
            class="pg-footer__link"
            href="https://gasly.artion.io/terms/Artion-Terms-v2.2-8-Oct-2021.pdf"
            target="_blank"
            >{{ $t('pgFooter.termsAndConditions') }}</a
        >
        <a
            class="pg-footer__link"
            href="https://app.termly.io/document/privacy-policy/7db4b9fc-aa5d-4f80-bfa1-27120ff982ba"
            target="_blank"
            >{{ $t('pgFooter.privacy') }}</a
        >
        <a
            class="pg-footer__link"
            href="https://app.termly.io/document/cookie-policy/c79f1a78-08a2-4da2-85f0-846a461cde81"
            target="_blank"
            >{{ $t('pgFooter.cookiePolicy') }}</a
        >
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
