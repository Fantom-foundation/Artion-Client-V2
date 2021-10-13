<template>
    <div class="pg-main">
        <p-g-header />

        <main>
            <p-g-hero></p-g-hero>
            <p-g-drop></p-g-drop>
            <p-g-nfts-list></p-g-nfts-list>
        </main>

        <p-g-footer></p-g-footer>
    </div>
</template>

<script>
import PGHeader from '../../components/PGHeader/PGHeader';
import PGHero from '../../components/PGHero/PGHero';
import PGDrop from '../../components/PGDrop/PGDrop';
import PGNftsList from '../../components/PGNftsList/PGNftsList';
import PGFooter from '../../components/PGFooter/PGFooter';

export default {
    name: 'PGMain',

    components: { PGHeader, PGHero, PGDrop, PGNftsList, PGFooter },
};
</script>

<style lang="scss">
@use "style";
</style>
