import appConfig from '../../../app.config.js';
// import Web3 from 'web3';
import WalletLink from 'walletlink';
import Web3 from 'web3';
import { store } from '@/store';
import { SET_WALLETLINK_CHAIN_ID } from '@/plugins/walletlink/store.js';
const OPERA_CHAIN_ID = appConfig.chainId;

/** @type {Walletlink} */
export let walletlink = null;

/**
 * Plugin for communication with Walletlink.
 */
export class Walletlink {
    /**
     * @param {Vue} _Vue
     */
    static install(_Vue) {
        if (!walletlink) {
            walletlink = new Walletlink();
            _Vue.prototype.$walletlink = walletlink;
        }
    }

    constructor() {
        this.selectedAddress = '';

        /**
         * Walletlink provider.
         *
         * @type {null}
         * @private
         */
        this._provider = null;
        this._walletLink = null;
        this._initialized = false;
        this._web3 = null;

        this.init();
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

            this._provider.on('chainChanged', (chainId) => {
                this._setChainId(chainId);
            });

            this.selectedAddress = this._provider.selectedAddress || '';
        }

        this._initialized = true;
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

    async disconnect() {
        await this._walletLink.disconnect();

        this._web3.eth.defaultAccount = null;
        this.selectedAddress = '';
    }

    /**
     * @return {boolean}
     */
    isCorrectChainId(chainId) {
        return this._provider && this._provider.chainId === (chainId || OPERA_CHAIN_ID);
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

    async signTransaction(_tx, _address) {
        if (this._provider) {
            _tx.from = _address;

            const txHash = await this._provider.request({
                method: 'eth_sendTransaction',
                params: [_tx],
            });

            return txHash;
        }
    }

    /**
     * @param {string} _chainId Hex number.
     * @private
     */
    _setChainId(_chainId) {
        store.commit(`walletlink/${SET_WALLETLINK_CHAIN_ID}`, _chainId);
    }

    /*adjustPopup() {
        const ePopup = document.querySelector('.-walletlink-extension-dialog-box');

        if (!ePopup) {
            return;
        }

        ePopup.classList.add('walletlinkpopup');

        const eH2 = ePopup.querySelector('.-walletlink-extension-dialog-box-bottom-description-region h2');
        if (eH2) {
            eH2.innerText = 'Scan to connect';
        }
    }*/
}
