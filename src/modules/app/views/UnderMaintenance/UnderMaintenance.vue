<template>
    <div class="undermaintenance">
        <div class="undermaintenance_wrap container">
            <div class="undermaintenance_box">
                <div class="undermaintenance_col undermaintenance_col-mod">
                    <f-image src="img/undermaintenance.png" class="undermaintenance_img" alt="man" />
                </div>
                <div class="undermaintenance_col">
                    <h1>{{ $t('undermaintenance.text') }}</h1>
                    <router-link :to="{ name: 'main' }" class="btn btn-lg">{{
                        $t('undermaintenance.link_title')
                    }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UnderMaintenance',
};
</script>

<style lang="scss">
@use "style";
</style>
