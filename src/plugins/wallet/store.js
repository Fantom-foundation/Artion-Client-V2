export const SET_CHAIN_ID = 'setChainId';
export const SET_ACCOUNT = 'setAccount';
export const SET_WALLET = 'setWallet';

const namespace = 'wallet';

export const walletStore = {
    module: {
        namespaced: !!namespace,

        state: {
            /** Currently selected chain id. */
            chainId: 0,
            /** Currently selected account. */
            account: '',
            /** Currently selected wallet. */
            wallet: '',
        },

        mutations: {
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
        },
    },
    storeInLocalStorage: ['chainId', 'account', 'wallet'],
    namespace,
};
