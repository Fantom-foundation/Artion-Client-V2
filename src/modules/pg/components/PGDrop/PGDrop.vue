<template>
    <div class="pg-drop" id="drop">
        <h2 class="h2 pg-drop__header">The drop</h2>
        <div class="pg-drop__text">
            <p v-html="$t('pgDrop.paragraph1')"></p>
            <p v-html="$t('pgDrop.paragraph2')"></p>
            <div class="pg-drop__backdrop pg-drop__backdrop--1"></div>
            <div class="pg-drop__backdrop pg-drop__backdrop--2"></div>
            <div class="pg-drop__backdrop pg-drop__backdrop--3"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PGDrop',
};
</script>

<style lang="scss">
@use "style";
</style>
