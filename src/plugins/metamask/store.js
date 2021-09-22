export const SET_CHAIN_ID = 'setChainId';
export const SET_ACCOUNT = 'setAccount';

const namespace = 'metamask';

export const metamaskStore = {
    module: {
        namespaced: !!namespace,

        state: {
            /** Currently selected chain id. */
            chainId: '0x0',
            /** Currently selected account. */
            account: '',
        },

        mutations: {
            /**
             * @param {Object} _state
             * @param {string} _chainId
             */
            [SET_CHAIN_ID](_state, _chainId) {
                _state.chainId = _chainId;
            },
            /**
             * @param {Object} _state
             * @param {string} _account
             */
            [SET_ACCOUNT](_state, _account) {
                _state.account = _account;
            },
        },
    },
    namespace,
};
