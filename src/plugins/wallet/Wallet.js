import store from '@/store';
import {
    SET_ACCOUNT,
    SET_CHAIN_ID,
    SET_WALLET,
    SET_BT,
    DELETE_BT,
    SET_USER_NAME,
    SET_USER_AVATAR,
    SET_USER_IS_MODERATOR,
} from '@/plugins/wallet/store/mutations.js';
import appConfig from '@/app.config.js';
import { implementsWalletInterface } from '@/plugins/wallet/interface.js';
import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { Metamask } from '@/plugins/wallet/metamask/Metamask.js';
import { Coinbase } from '@/plugins/wallet/coinbase/Coinbase.js';
import { WalletConnect } from '@/plugins/wallet/walletconnect/WalletConnect20.js';
import { clone, defer } from 'fantom-vue-components/src/utils';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';
import { delay } from 'fantom-vue-components/src/utils/function.js';
import { toBigNumber, toHex, toInt } from '@/utils/big-number.js';
import { compareAddresses } from '@/utils/address.js';

// import Web3 from 'web3';
// import store from '@/store';
// import { SET_ACCOUNT, SET_CHAIN_ID } from '@/plugins/metamask/store.js';

const OPERA_CHAIN_ID = parseInt(appConfig.chainId, 16);
export let wallet = null;

implementsWalletInterface(Metamask);
implementsWalletInterface(Coinbase);
implementsWalletInterface(WalletConnect);

/**
 *
 */
export class Wallet {
    /**
     * @param {Vue} Vue
     * @param {Object} options
     */
    static install(Vue, options = { wallets: [] }) {
        if (!wallet) {
            wallet = new Wallet(options);
            Vue.prototype.$wallet = wallet;
        }
    }

    constructor({ wallets = [] }) {
        /** Currently used wallet */
        this.wallet = null;
        /** Keys are wallet names, values are wallet instances */
        this._wallets = {};
        this._logoutInProgress = false;
        this.account = '';
        this.chainId = 0;
        this.connected = false;
        this.user = null;

        this._initWallets(wallets);
    }

    /**
     * @param {Object} tx
     * @param {boolean} [waitUntilVerified]
     * @param {string} [address]
     * @return {Promise<*|string>} Tx hash
     */
    async signTransaction(tx, waitUntilVerified = false, address) {
        // return this.wallet ? await this.wallet.signTransaction(tx, address) : '';
        let txHash = '';
        let ok = false;

        if (this.wallet) {
            txHash = await this.wallet.signTransaction(clone(tx), address);

            if (txHash && waitUntilVerified) {
                ok = await this._verifyTransaction(txHash);
            }
        }

        return {
            txHash,
            ok,
        };
    }

    /**
     * @param {string} message
     * @param {string} account
     * @return {Promise<string>}
     */
    async personalSign(message, account) {
        return this.wallet ? await this.wallet.personalSign(message, account) : '';
    }

    /**
     * @return {boolean}
     */
    isInstalled() {
        return this.wallet ? this.wallet.isInstalled() : false;
    }

    /**
     * @return {boolean}
     */
    isCorrectChainId() {
        return this.wallet ? toInt(this.wallet.getChainId()) === toInt(OPERA_CHAIN_ID) : false;
    }

    /**
     * @return {boolean}
     */
    is(walletName) {
        return this.wallet ? walletName === this.wallet.name() : false;
    }

    async logout(dontDisconnectWallet = false) {
        if (this._logoutInProgress) {
            return;
        }

        this._logoutInProgress = true;

        this.deleteBearerToken(this.account);
        this.user = null;

        this.connected = false;
        this.account = '';
        this.chainId = 0;

        if (this.wallet && !dontDisconnectWallet) {
            await this.wallet.disconnect();
            this.wallet = null;
        }

        defer(() => {
            this._setChainId(0);
            this._setAccount('');
            this._setWalletName('');
            this._setUserName('');

            this._logoutInProgress = false;

            window.location.reload();
        });
    }

    /**
     * @param {[]} wallets
     * @private
     */
    _initWallets(wallets = []) {
        wallets.forEach(walletName => {
            this._wallets[walletName] = null;
        });

        const { wallet } = store.state.wallet;

        if (wallet) {
            this.setWallet(wallet);
        }
    }

    /**
     * @param {'metamask'|'coinbase'|'walletconnect'} walletName
     * @param {boolean} [pick]
     * @return {Promise<boolean>}
     */
    async setWallet(walletName, pick) {
        const wallets = this._wallets;
        let wallet = null;

        if (walletName in wallets) {
            try {
                wallet = wallets[walletName];

                if (wallet === null) {
                    wallet = this._createWalletInstance(walletName);
                    await wallet.init();
                }

                const account = await wallet.getAccount(pick);

                if (!account) {
                    this.logout();
                    return;
                }

                this._setChainId(wallet.getChainId());
                this._setAccount(account);

                this.wallet = wallet;
                this.connected = true;

                this._setWalletName(walletName);

                if (pick) {
                    notifications.add({
                        type: 'success',
                        text: 'Wallet added',
                    });
                }

                return true;
            } catch (error) {
                notifications.add({
                    type: 'error',
                    text: error.message,
                });

                return false;
            }
        } else {
            throw new Error(`Unknown wallet ${walletName}`);
        }
    }

    setBearerToken(bt) {
        if (this.account && bt) {
            store.commit(`wallet/${SET_BT}`, {
                account: this.account.toLowerCase(),
                bt,
            });
        }
    }

    getBearerToken() {
        const account = this.account || store.state.wallet.account || '';

        return store.state.wallet.bt[account.toLowerCase()] || '';
    }

    deleteBearerToken(account) {
        if (account) {
            store.commit(`wallet/${DELETE_BT}`, account.toLowerCase());
        }
    }

    setUser(user) {
        if (this.account && user && compareAddresses(this.account, user.address)) {
            this.user = user;

            this._setUserName(user.username || '');
            this._setUserAvatar(user.avatarThumb || '');
            this._setUserIsModerator(user.isModerator || false);
        }
    }

    getUser() {
        return this.account;
    }

    /**
     * @param {string} address
     * @param {boolean} [inHexFormat]
     * @return {Promise<number|string|*|number>}
     */
    async getNonce(address, inHexFormat) {
        const nonce = await gqlQuery(
            {
                query: gql`
                    query AccountByAddress($address: Address!) {
                        account(address: $address) {
                            txCount
                        }
                    }
                `,
                variables: {
                    address: address,
                },
                fetchPolicy: 'network-only',
            },
            'account.txCount',
            fantomApolloClient
        );

        return inHexFormat ? nonce : parseInt(nonce, 16);
    }

    /**
     * @param {string} address
     * @param {boolean} [inHexFormat]
     * @return {Promise<number|string|*|number>}
     */
    async getGasPrice(inHexFormat) {
        let gasPrice = await gqlQuery(
            {
                query: gql`
                    query GasPrice {
                        gasPrice
                    }
                `,
                fetchPolicy: 'network-only',
            },
            'gasPrice',
            fantomApolloClient
        );

        // gasPrice * 1.2
        gasPrice = toHex(toBigNumber(gasPrice).multipliedBy(1.2));

        return inHexFormat ? gasPrice : parseInt(gasPrice, 16);
    }

    /**
     * @param {string} from
     * @param {string} to
     * @param {string} value
     * @param {string} data
     * @return {Promise<string>}
     */
    async estimateGas({ from = undefined, to = undefined, value = undefined, data = undefined }, silent = false) {
        const estimateGas = await gqlQuery(
            {
                query: gql`
                    query EstimateGas($from: Address, $to: Address, $value: BigInt, $data: String) {
                        estimateGas(from: $from, to: $to, value: $value, data: $data)
                    }
                `,
                variables: { from, to, value, data },
                fetchPolicy: 'network-only',
            },
            'estimateGas',
            fantomApolloClient,
            silent
        );

        return estimateGas;
    }

    async getTransactionReceipt(txHash, maxRetry = 5) {
        const { wallet } = this;
        let receipt = null;
        let c = 0;

        if (wallet) {
            receipt = await wallet._web3.eth.getTransactionReceipt(txHash);

            while (receipt === null && c < maxRetry) {
                await delay(350);
                receipt = await wallet._web3.eth.getTransactionReceipt(txHash);
                console.log('getTransactionReceipt next try');
                c += 1;
            }
        }

        return receipt;
    }

    /**
     * @param {string} txHash
     * @return {Promise<boolean>}
     * @private
     */
    async _verifyTransaction(txHash) {
        let status = null;
        let ok = false;

        if (txHash) {
            while (status === null) {
                status = await this._getTransactionStatus(txHash);
                await delay(400);
            }

            ok = parseInt(status, 16) === 1;
        }

        return ok;
    }

    /**
     * @param {string} txHash
     * @return {Promise<number|string|*|undefined|null>}
     * @private
     */
    _getTransactionStatus(txHash) {
        return gqlQuery(
            {
                query: gql`
                    query TransactionByHash($hash: Bytes32!) {
                        transaction(hash: $hash) {
                            status
                        }
                    }
                `,
                variables: {
                    hash: txHash,
                },
                fetchPolicy: 'network-only',
            },
            'transaction.status',
            fantomApolloClient
        );
    }

    /**
     * @param {number} chainId
     * @private
     */
    _setChainId(chainId) {
        if (isNaN(chainId)) {
            this.logout();
        }

        this.chainId = chainId;

        store.commit(`wallet/${SET_CHAIN_ID}`, chainId);
    }

    /**
     * @param {string} account
     * @private
     */
    _setAccount(account) {
        this.account = account;
        store.commit(`wallet/${SET_ACCOUNT}`, account);

        if (!account) {
            this.logout();
        }
    }

    /**
     * @param {'metamask'|'coinbase'|'walletconnect'|''} walletName
     * @private
     */
    _setWalletName(walletName) {
        store.commit(`wallet/${SET_WALLET}`, walletName || '');
    }

    /**
     * @param {string} userName
     * @private
     */
    _setUserName(userName) {
        store.commit(`wallet/${SET_USER_NAME}`, userName);
    }

    /**
     * @param {string} userAvatar
     * @private
     */
    _setUserAvatar(userAvatar) {
        store.commit(`wallet/${SET_USER_AVATAR}`, userAvatar);
    }

    /**
     * @param {boolean} userIsModerator
     * @private
     */
    _setUserIsModerator(userIsModerator) {
        store.commit(`wallet/${SET_USER_IS_MODERATOR}`, userIsModerator);
    }

    /**
     * @param {'metamask'|'coinbase'|'walletconnect'} walletName
     * @return {null|Metamask|Coinbase|WalletConnect}
     * @private
     */
    _createWalletInstance(walletName) {
        if (walletName === 'metamask') {
            return new Metamask(this);
        } else if (walletName === 'coinbase') {
            return new Coinbase(this);
        } else if (walletName === 'walletconnect') {
            return new WalletConnect(this);
        }

        return null;
    }

    /**
     * Called on chainId change.
     *
     * @param {string} chainId Hex number.
     * @private
     */
    onChainChange(chainId) {
        this._setChainId(chainId);
    }

    /**
     * Called on account change.
     *
     * @param {string} account
     * @private
     */
    onAccountsChange(account) {
        this._setAccount(account);
    }
}
