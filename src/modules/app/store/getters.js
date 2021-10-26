export const getters = {
    /**
     * @param {AppState} state
     * @return {string}
     */
    language(state) {
        return state.language;
    },
    /**
     * @param {AppState} state
     * @return {string}
     */
    theme(state) {
        return state.theme;
    },
    /**
     * @param {AppState} state
     * @return {string}
     */
    txStatus(state) {
        return state.txStatus;
    },
    /**
     * @param {AppState} state
     * @return {string}
     */
    nftsDensity(state) {
        return state.nftsDensity;
    },
    /**
     * @param {AppState} state
     * @return {boolean}
     */
    autoDarkTheme(state) {
        return state.autoDarkTheme;
    },
};
