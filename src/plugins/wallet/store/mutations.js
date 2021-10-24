export const SET_CHAIN_ID = 'setChainId';
export const SET_ACCOUNT = 'setAccount';
export const SET_WALLET = 'setWallet';
export const SET_USER_NAME = 'setUserName';
export const SET_USER_AVATAR = 'setUserAvatar';
export const SET_BT = 'setBT';
export const DELETE_BT = 'deleteBT';

export const mutations = {
    /**
     * @param {Object} state
     * @param {string} chainId
     */
    [SET_CHAIN_ID](state, chainId) {
        state.chainId = chainId;
    },
    /**
     * @param {Object} state
     * @param {string} account
     */
    [SET_ACCOUNT](state, account) {
        state.account = account;
    },
    /**
     * @param {Object} state
     * @param {string} walletName
     */
    [SET_WALLET](state, walletName) {
        state.wallet = walletName;
    },
    /**
     * @param {Object} state
     * @param {string} walletName
     */
    [SET_WALLET](state, walletName) {
        state.wallet = walletName;
    },
    /**
     * @param {Object} state
     * @param {string} userName
     */
    [SET_USER_NAME](state, userName) {
        state.userName = userName;
    },
    /**
     * @param {Object} state
     * @param {string} userAvatar
     */
    [SET_USER_AVATAR](state, userAvatar) {
        state.userAvatar = userAvatar;
    },
    /**
     * @param {Object} state
     * @param {{account: string, bt: string}} payload
     */
    [SET_BT](state, payload) {
        if (payload.account) {
            console.log('SET_BT', payload.account, payload.bt);
            state.bt = { ...state.bt, [payload.account]: payload.bt };
        }
    },
    /**
     * @param {Object} state
     * @param {string} account
     */
    [DELETE_BT](state, account) {
        const bt = { ...state.bt };

        delete bt[account];
        state.bt = bt;
    },
};
