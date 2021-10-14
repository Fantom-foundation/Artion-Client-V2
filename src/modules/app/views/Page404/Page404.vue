<template>
    <div class="page404">
        <div class="page404_body container">
            <div class="page404_col">
                <h1>{{ $t('view_not_found.404') }}</h1>
                <p>{{ $t('view_not_found.text') }}</p>
                <router-link to="/" class="btn btn-lg">{{ $t('view_not_found.link_title') }}</router-link>
            </div>
            <div class="page404_col">
                <f-image src="img/404_man.png" alt="man" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Page404',
};
</script>

<style lang="scss">
@use "style";
</style>
