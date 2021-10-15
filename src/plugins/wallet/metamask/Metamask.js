import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import './metamask.types.js';
import { toInt } from '@/utils/big-number.js';

/** @type {MetamaskChain} */
/*
export const OPERA_MAINNET = {
    chainId: appConfig.mainnet.chainId,
    chainName: 'Fantom Opera Mainnet',
    nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
    },
    rpcUrls: [appConfig.mainnet.rpc],
    blockExplorerUrls: [appConfig.mainnet.explorerUrl],
};
*/

/** @type {MetamaskChain} */
/*
export const OPERA_TESTNET = {
    chainId: appConfig.testnet.chainId,
    chainName: 'Fantom Testnet',
    nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18,
    },
    rpcUrls: [appConfig.testnet.rpc],
    blockExplorerUrls: [appConfig.testnet.explorerUrl],
};
*/

/**
 * Plugin for communication with Metamask.
 */
export class Metamask {
    /**
     * @param {Wallet} wallet
     */
    constructor(wallet) {
        /**
         * Metamask provider.
         *
         * @type {null}
         * @private
         */
        this._provider = null;
        /** Signals, if Metamask is installed. */
        this._installed = false;
        this._initialized = false;
        this._web3 = null;

        this._wallet = wallet;
    }

    async init() {
        if (!this._initialized && window.ethereum) {
            await this._detectProvider();

            const provider = this._provider;

            if (provider) {
                this._web3 = new Web3(provider);

                provider.autoRefreshOnNetworkChange = false;
                provider.on('chainChanged', chainId => {
                    if (this._wallet) {
                        this._wallet.onChainChange(chainId);
                    }
                });
                provider.on('accountsChanged', accounts => {
                    if (this._wallet) {
                        this._wallet.onAccountsChange(accounts[0]);
                    }
                });
                provider.on('disconnect', () => {
                    window.location.reload();
                });
            }
        }

        this._initialized = true;
    }

    /**
     * @param {Object} tx
     * @param {string} [address]
     * @return {Promise<*|string>} Tx hash
     */
    async signTransaction(tx, address) {
        if (this._provider) {
            if (address) {
                tx.from = address;
            }

            return await this._provider.request({
                method: 'eth_sendTransaction',
                params: [tx],
            });
        }

        return '';
    }

    /**
     * @param {string} message
     * @param {string} account
     * @return {Promise<string>}
     */
    async personalSign(message, account) {
        return await this._web3.eth.personal.sign(message, account, '');
    }

    /**
     * @param [pick]
     * @return {Promise<*|string>}
     */
    async getAccount(pick) {
        const accounts = pick ? await this.requestAccounts() : await this.getAccounts();

        return accounts ? accounts[0] || '' : '';
    }

    /**
     * @return {number}
     */
    getChainId() {
        return this._provider ? toInt(this._provider.chainId) : 0;
    }

    /**
     * @return {string}
     */
    name() {
        return 'metamask';
    }

    /**
     * Signals, if Metamask is installed.
     *
     * @return {boolean}
     */
    isInstalled() {
        return this._installed;
    }

    async disconnect() {}

    web3() {
        return this._web3;
    }

    /**
     * @return {Promise<[]>}
     */
    async getAccounts() {
        let accounts = [];

        if (this._provider) {
            try {
                accounts = await this._provider.request({ method: 'eth_accounts' });
            } catch (_error) {
                console.error(_error);
            }
        }

        return accounts;
    }

    /**
     * @return {Promise<*>}
     */
    async requestAccounts() {
        if (this._provider) {
            try {
                return await this._provider.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                // userRejectedRequest error
                if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(error);
                }

                throw new Error(error.message);
            }
        }
    }

    /**
     * @return {Promise<*>}
     */
    async requestPermissions() {
        if (this._provider) {
            try {
                return this._provider.request({
                    method: 'wallet_requestPermissions',
                    params: [
                        {
                            eth_accounts: {},
                        },
                    ],
                });
            } catch (_error) {
                console.error(_error);
            }
        }
    }

    /**
     * @param {MetamaskChain} _chain
     * @return {Promise<*>}
     */
    async addEthereumChain(_chain) {
        if (this._provider) {
            return await this._provider.request({
                method: 'wallet_addEthereumChain',
                params: [{ ..._chain }],
            });
        }
    }

    /**
     * @param {MetamaskAsset} _asset
     * @return {Promise<*>}
     */
    async watchAsset(_asset) {
        if (this._provider) {
            return await this._provider.request({
                method: 'wallet_watchAsset',
                params: { ..._asset },
            });
        }
    }

    /**
     * Detect the MetaMask Ethereum provider.
     *
     * @private
     */
    async _detectProvider() {
        const provider = await detectEthereumProvider();

        if (provider) {
            if (provider === window.ethereum) {
                this._provider = provider;
                this._installed = true;
            } else {
                console.error('Do you have multiple wallets installed?');
            }
        }
    }
}
