import appConfig from '../../../app.config.js';
import WalletLink from 'walletlink';
import Web3 from 'web3';
import { toInt } from '@/utils/big-number.js';

export class Coinbase {
    /**
     * @param {Wallet} wallet
     */
    constructor(wallet) {
        this.selectedAddress = '';

        /**
         * Coinbase provider.
         *
         * @type {null}
         * @private
         */
        this._provider = null;
        this._walletLink = null;
        this._initialized = false;
        this._web3 = null;

        this._wallet = wallet;
    }

    async init() {
        if (!this._initialized && !appConfig.isChromeExtension) {
            this._walletLink = new WalletLink({
                appName: appConfig.name,
                appLogoUrl:
                    'https://play-lh.googleusercontent.com/R3re-12NV0ImOlXiem3jMUwnjFlWJOQix0G5aRZxuPA1-Kli0z2KMwR0lvL71lRhdms=s180-rw',
                darkMode: true,
            });

            this._provider = this._walletLink.makeWeb3Provider(appConfig.mainnet.rpc, appConfig.mainnet.chainId);
            this._web3 = new Web3(this._provider);

            this._provider.on('chainChanged', chainId => {
                if (this._wallet) {
                    this._wallet.onChainChange(chainId);
                }
            });

            this.selectedAddress = this._provider.selectedAddress || '';
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
     * @return {Promise<string>}
     */
    async getAccount() {
        if (!this.selectedAddress) {
            const accounts = await this.connect();

            if (accounts) {
                this.selectedAddress = accounts[0];
            }
        }

        return this.selectedAddress || '';
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
        return 'coinbase';
    }

    /**
     * @return {boolean}
     */
    isInstalled() {
        return true;
    }

    async disconnect() {
        await this._walletLink.disconnect();

        this._web3.eth.defaultAccount = null;
        this.selectedAddress = '';
    }

    web3() {
        return this._web3;
    }

    async connect() {
        /*
        setTimeout(() => {
            this.adjustPopup();
        }, 100);
        */

        const accounts = await this._provider.enable();

        this._web3.eth.defaultAccount = accounts[0];
        this.selectedAddress = accounts[0];

        // console.log('accounts: ', accounts, this._provider);

        return accounts;
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

    async requestAccounts() {
        if (this._provider) {
            try {
                return await this._provider.request({ method: 'eth_requestAccounts' });
            } catch (_error) {
                // userRejectedRequest error
                if (_error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(_error);
                }
            }
        }
    }
}
