export const SET_SHOW_BID_MODAL = 'setShowBidModal';
export const SET_SHOW_SUCCESS_MODAL = 'setShowSuccessModal';

export const mutations = {
    /**
     * @param {PgState} state
     * @param {boolean} show
     */
    [SET_SHOW_BID_MODAL](state, show) {
        state.showBidModal = show;
    },

    /**
     * @param {PgState} state
     * @param {boolean} show
     */
    [SET_SHOW_SUCCESS_MODAL](state, show) {
        state.showSuccessModal = show;
    },
};
