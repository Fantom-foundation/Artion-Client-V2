<template>
    <div class="pgmain">
        <p-g-header />

        <main>
            <p-g-hero></p-g-hero>
            <p-g-drop></p-g-drop>
        </main>
    </div>
</template>

<script>
import PGHeader from '../../components/PGHeader/PGHeader';
import PGHero from '../../components/PGHero/PGHero';
import PGDrop from '../../components/PGDrop/PGDrop';

export default {
    name: 'PGMain',

    components: { PGHeader, PGHero, PGDrop },
};
</script>

<style lang="scss"></style>
