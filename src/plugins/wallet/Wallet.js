import store from '@/store';
import { SET_ACCOUNT, SET_CHAIN_ID, SET_WALLET } from '@/plugins/wallet/store.js';
import appConfig from '@/app.config.js';
import { implementsWalletInterface } from '@/plugins/wallet/interface.js';
import { Fetch } from '@/utils/Fetch.js';
import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql-query.js';
import { Metamask } from '@/plugins/wallet/metamask/Metamask.js';
import { Coinbase } from '@/plugins/wallet/coinbase/Coinbase.js';
import { defer } from 'fantom-vue-components/src/utils';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';

// import Web3 from 'web3';
// import store from '@/store';
// import { SET_ACCOUNT, SET_CHAIN_ID } from '@/plugins/metamask/store.js';

const OPERA_CHAIN_ID = parseInt(appConfig.chainId, 16);
export let wallet = null;

implementsWalletInterface(Metamask);
implementsWalletInterface(Coinbase);

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
        this.account = '';
        this.chainId = 0;
        this.connected = false;

        this._initWallets(wallets);
    }

    /**
     * @param {Object} tx
     * @param {string} [address]
     * @return {Promise<*|string>} Tx hash
     */
    async signTransaction(tx, address) {
        return this.wallet ? await this.wallet.signTransaction(tx, address) : '';
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
        return this.wallet ? this.wallet.getChainId() === OPERA_CHAIN_ID : false;
    }

    /**
     * @return {boolean}
     */
    is(walletName) {
        return this.wallet ? walletName === this.wallet.name() : false;
    }

    logout() {
        this.connected = false;
        this.account = '';
        this.chainId = 0;

        if (this.wallet) {
            this.wallet.disconnect();
            this.wallet = null;
        }

        defer(() => {
            this._setChainId(0);
            this._setAccount('');
            this._setWalletName('');
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
     * @param {'metamask'|'coinbase'} walletName
     * @param {boolean} [pick]
     * @return {Promise<void>}
     */
    async setWallet(walletName, pick) {
        const wallets = this._wallets;
        let wallet = null;

        try {
            if (walletName in wallets) {
                wallet = wallets[walletName];

                if (wallet === null) {
                    wallet = this._createWalletInstance(walletName);
                    await wallet.init();
                }

                this._setChainId(wallet.getChainId());
                this._setAccount(await wallet.getAccount(pick));

                this.wallet = wallet;
                this.connected = true;

                this._setWalletName(walletName);
            } else {
                throw new Error(`Unknown wallet ${walletName}`);
            }
        } catch (error) {
            notifications.add({
                type: 'error',
                text: error.message,
            });
        }
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
            },
            'account.txCount',
            Fetch
        );

        return inHexFormat ? nonce : parseInt(nonce, 16);

        /*const web3 = this.wallet ? this.wallet.web3() : null;

        if (web3) {
            return web3.eth.getTransactionCount(address);
        }

        return -1;*/
    }

    /**
     * @param {string} from
     * @param {string} to
     * @param {string} value
     * @param {string} data
     * @return {Promise<void>}
     */
    async estimateGas({ from = undefined, to = undefined, value = undefined, data = undefined }) {
        const dt = await Fetch.gqlQuery({
            query: gql`
                query EstimateGas($from: Address, $to: Address, $value: BigInt, $data: String) {
                    estimateGas(from: $from, to: $to, value: $value, data: $data)
                }
            `,
            variables: { from, to, value, data },
        });

        console.log(dt);

        /*const web3 = this.wallet ? this.wallet.web3() : null;

        if (web3) {
            return web3.eth.estimateGas({
                from,
                to,
                data,
                nonce: nonce > -1 ? nonce : await this.getNonce(from),
            });
        }

        return -1;*/
    }

    /**
     * @param {number} chainId
     * @private
     */
    _setChainId(chainId) {
        console.log('CHANINID', chainId, !chainId);
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
        console.log('ACCOUTN', account, !account);

        this.account = account;
        store.commit(`wallet/${SET_ACCOUNT}`, account);
    }

    /**
     * @param {'metamask'|'coinbase'|''} walletName
     * @private
     */
    _setWalletName(walletName) {
        store.commit(`wallet/${SET_WALLET}`, walletName || '');
    }

    /**
     * @param {'metamask'|'coinbase'} walletName
     * @return {null|Metamask|Coinbase}
     * @private
     */
    _createWalletInstance(walletName) {
        if (walletName === 'metamask') {
            return new Metamask(this);
        } else if (walletName === 'coinbase') {
            return new Coinbase(this);
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
