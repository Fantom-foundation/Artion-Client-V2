export const SET_WALLETLINK_CHAIN_ID = 'setWalletLinkChainId';

const namespace = 'walletlink';

export const walletlinkStore = {
    module: {
        namespaced: !!namespace,

        state: {
            /** Currently selected chain id. */
            chainId: '0x0',
        },

        mutations: {
            /**
             * @param {Object} _state
             * @param {string} _chainId
             */
            [SET_WALLETLINK_CHAIN_ID](_state, _chainId) {
                _state.chainId = _chainId;
            },
        },
    },
    namespace,
};
