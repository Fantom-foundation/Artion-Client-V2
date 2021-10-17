<template>
    <div class="pghome">
        <p-g-hero></p-g-hero>
        <p-g-drop></p-g-drop>
        <p-g-nfts-list></p-g-nfts-list>
        <p-g-faq></p-g-faq>
    </div>
</template>

<script>
import PGHero from '@/modules/pg/components/PGHero/PGHero.vue';
import PGDrop from '@/modules/pg/components/PGDrop/PGDrop.vue';
import PGNftsList from '@/modules/pg/components/PGNftsList/PGNftsList.vue';
import PGFaq from '@/modules/pg/components/PGFaq/PGFaq.vue';

export default {
    name: 'PGHome',

    components: { PGFaq, PGNftsList, PGDrop, PGHero },
};
</script>
