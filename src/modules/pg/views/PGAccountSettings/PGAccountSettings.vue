<template>
    <div class="pgaccountsettings">PGAccountSettings</div>
</template>

<script>
import { authPageMixin } from '@/common/mixins/auth-page.js';

export default {
    name: 'PGAccountSettings',

    mixins: [authPageMixin],
};
</script>

<style lang="scss">
@use "style";
</style>
