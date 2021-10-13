export const SET_SHOW_MODAL = 'setShowModal';

export const mutations = {
    /**
     * @param {PgState} state
     * @param {boolean} show
     */
    [SET_SHOW_MODAL](state, show) {
        state.showModal = show;
    },
};
