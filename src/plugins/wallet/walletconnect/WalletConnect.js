import appConfig from '../../../app.config.js';
import WC from '@walletconnect/client';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';

const OPERA_CHAIN_ID = parseInt(appConfig.mainnet.chainId, 16);

export class WalletConnect {
    /**
     * @param {Wallet} wallet
     */
    constructor(wallet) {
        this.selectedAddress = '';
        this.chainId = 0;

        this._walletConnect = null;
        this._initialized = false;
        this._web3 = null;

        this._wallet = wallet;
    }

    async init() {
        if (!this._initialized) {
            this._walletConnect = new WC({
                bridge: 'https://bridge.walletconnect.org',
                qrcodeModal: WalletConnectQRCodeModal,
            });

            const provider = new WalletConnectProvider({
                // infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
                rpc: {
                    [OPERA_CHAIN_ID]: appConfig.mainnet.rpc,
                },
                chainId: OPERA_CHAIN_ID,
            });

            this._web3 = new Web3(provider);

            this._walletConnect.on('session_update', (error, payload) => {
                if (error) {
                    throw error;
                }

                const { accounts, chainId } = payload.params[0];

                if (this._wallet) {
                    this._wallet.onChainChange(chainId);
                }

                this.onSessionUpdate(accounts, chainId);
            });

            this._walletConnect.on('disconnect', error => {
                if (error) {
                    throw error;
                }

                this._setChainId(0);
                this._setAccount('');

                this._wallet.logout(true);
            });

            if (this._walletConnect.connected) {
                const { chainId, accounts } = this._walletConnect;
                this.onSessionUpdate(accounts, chainId);
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
        let hash = '';

        if (this._walletConnect) {
            if (address) {
                tx.from = address;
            }

            const msgId = this.showNotification();

            try {
                hash = await this._walletConnect.sendTransaction(tx);

                this.hideNotification(msgId);
            } catch (error) {
                this.hideNotification(msgId);
                throw new Error(error);
            }
        }

        return hash;
    }

    /**
     * @param {string} message
     * @param {string} account
     * @return {Promise<string>}
     */
    async personalSign(message, account) {
        let msg = '';

        if (this._walletConnect) {
            const msgId = this.showNotification();

            try {
                msg = await this._walletConnect.signPersonalMessage([message, account]);

                this.hideNotification(msgId);
            } catch (error) {
                this.hideNotification(msgId);
                throw new Error(error);
            }
        }

        return msg;
    }

    /**
     * @return {Promise<string>}
     */
    async getAccount() {
        if (!this.selectedAddress) {
            const accounts = await this.connect();

            if (accounts) {
                this._setAccount(accounts[0]);
            }
        }

        return this.selectedAddress || '';
    }

    /**
     * @return {number}
     */
    getChainId() {
        return this.chainId;
    }

    /**
     * @return {string}
     */
    name() {
        return 'walletconnect';
    }

    /**
     * @return {boolean}
     */
    isInstalled() {
        return true;
    }

    async disconnect() {
        if (this._walletConnect) {
            await this._walletConnect.killSession();
        }
    }

    web3() {
        return this._web3;
    }

    async connect() {
        const { accounts, chainId } = await this._walletConnect.connect({
            chainId: OPERA_CHAIN_ID,
            rpcUrl: appConfig.mainnet.rpc,
        });

        this._setAccount(accounts[0]);
        this._setChainId(chainId);

        return accounts;
    }

    /**
     * @param {number} chainId
     * @private
     */
    _setChainId(chainId = 0) {
        this.chainId = chainId;
    }

    /**
     * @param {string} account
     * @private
     */
    _setAccount(account = '') {
        this.selectedAddress = account;
    }

    showNotification() {
        return notifications.add({
            type: 'info',
            text: 'Confirm on phone',
            hideAfter: 10000000,
        });
    }

    hideNotification(msgId = '') {
        notifications.hide(msgId);
    }

    /**
     * @param {string[]} accounts
     * @param {number} chainId
     */
    onSessionUpdate(accounts, chainId) {
        this._setAccount(accounts[0]);
        this._setChainId(chainId);
    }
}
