<template>
    <div class="pg-main">
        <p-g-header />

        <main>
            <p-g-hero></p-g-hero>
            <p-g-drop></p-g-drop>
            <p-g-nfts-list></p-g-nfts-list>
        </main>
    </div>
</template>

<script>
import PGHeader from '../../components/PGHeader/PGHeader';
import PGHero from '../../components/PGHero/PGHero';
import PGDrop from '../../components/PGDrop/PGDrop';
import PGNftsList from '../../components/PGNftsList/PGNftsList';

export default {
    name: 'PGMain',

    components: { PGHeader, PGHero, PGDrop, PGNftsList },
};
</script>

<style lang="scss">
@use "style";
</style>
