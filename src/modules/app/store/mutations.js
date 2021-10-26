export const SET_LANGUAGE = 'setLanguage';
export const SET_THEME = 'setTheme';
export const SET_TX_STATUS = 'setTxStatus';
export const SET_NFTS_DENSITY = 'setNftsDensity';
export const SET_AUTO_DARK_MODE = 'setAutoDarkMode';

export const mutations = {
    /**
     * @param {AppState} state
     * @param {string} languageCode
     */
    [SET_LANGUAGE](state, languageCode) {
        state.language = languageCode;
    },
    /**
     * @param {AppState} state
     * @param {string} theme
     */
    [SET_THEME](state, theme) {
        state.theme = theme;
    },
    /**
     * @param {AppState} state
     * @param {TxStatus} txStatus
     */
    [SET_TX_STATUS](state, txStatus) {
        state.txStatus = txStatus;
    },
    /**
     * @param {AppState} state
     * @param {number} nftsDensity
     */
    [SET_NFTS_DENSITY](state, nftsDensity) {
        state.nftsDensity = nftsDensity;
    },
    /**
     * @param {AppState} state
     * @param {boolean} autoDarkTheme
     */
    [SET_AUTO_DARK_MODE](state, autoDarkTheme) {
        state.autoDarkTheme = autoDarkTheme;
    },
};
