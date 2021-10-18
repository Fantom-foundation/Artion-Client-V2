<template>
    <div class="pg-faq" id="faq">
        <h2 class="h2 pg-faq__header">FAQs</h2>

        <ul class="pg-faq__list">
            <p-g-faq v-for="item in [0, 1, 2, 3, 4, 5, 6]" :key="item"></p-g-faq>
        </ul>
    </div>
</template>

<script>
import PGFaq from '../PGFaq/PGFaq';

export default {
    name: 'PGFaqList',

    components: {
        PGFaq,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
