export const getters = {
    /**
     * @param {PgState} state
     * @return {boolean}
     */
    showBidModal(state) {
        return state.showBidModal;
    },

    /**
     * @param {PgState} state
     * @return {boolean}
     */
    showSuccessModal(state) {
        return state.showSuccessModal;
    },
};
