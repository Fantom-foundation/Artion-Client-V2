<template>
    <div class="pg-main">
        <p-g-header />

        <main>
            <p-g-hero></p-g-hero>
            <p-g-drop></p-g-drop>
            <p-g-nfts-list></p-g-nfts-list>
            <p-g-faq></p-g-faq>
        </main>

        <p-g-footer></p-g-footer>

        <p-g-modal v-if="showSuccessModal" @close="closeModal" no-heading>
            <p-g-success-notification></p-g-success-notification>
        </p-g-modal>
    </div>
</template>

<script>
import { SET_SHOW_SUCCESS_MODAL } from '../../store/mutations';
import PGHeader from '../../components/PGHeader/PGHeader';
import PGHero from '../../components/PGHero/PGHero';
import PGDrop from '../../components/PGDrop/PGDrop';
import PGNftsList from '../../components/PGNftsList/PGNftsList';
import PGFooter from '../../components/PGFooter/PGFooter';
import PGSuccessNotification from '../../components/PGSuccessNotification/PGSuccessNotification';
import { mapGetters } from 'vuex';
import PGModal from '../../components/PGModal/PGModal';
import PGFaq from '../../components/PGFaq/PGFaq';

export default {
    name: 'PGMain',

    components: { PGHeader, PGHero, PGDrop, PGNftsList, PGFooter, PGSuccessNotification, PGModal, PGFaq },

    computed: {
        ...mapGetters('pg', ['showSuccessModal']),
    },

    methods: {
        openModal() {
            this.$store.commit(`pg/${SET_SHOW_SUCCESS_MODAL}`, true);
        },

        closeModal() {
            this.$store.commit(`pg/${SET_SHOW_SUCCESS_MODAL}`, false);
        },
    },
};
</script>

<style lang="scss">
@use "style";
</style>
