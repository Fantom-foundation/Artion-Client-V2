<template>
    <div class="pg-main">
        <p-g-header />

        <main>
            <router-view />
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
import PGFooter from '../../components/PGFooter/PGFooter';
import PGSuccessNotification from '../../components/PGSuccessNotification/PGSuccessNotification';
import { mapGetters } from 'vuex';
import PGModal from '../../components/PGModal/PGModal';

export default {
    name: 'PGMain',

    components: { PGHeader, PGFooter, PGSuccessNotification, PGModal },

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
