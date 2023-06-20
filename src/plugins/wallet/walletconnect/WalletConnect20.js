import appConfig from '../../../app.config.js';
import { Web3Modal } from '@web3modal/standalone';
import UniversalProvider from '@walletconnect/universal-provider';
// import * as encoding from '@walletconnect/encoding';
import { toInt } from '@/utils/big-number.js';
import { delay } from 'fantom-vue-components/src/utils/function.js';
import Web3 from 'web3';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';

const OPERA_CHAIN_ID = parseInt(appConfig.mainnet.chainId, 16);
const RPC_URL = appConfig.rpc;

export class WalletConnect {
    constructor(wallet) {
        this.selectedAddress = '';
        this.chainId = '';

        this._options = {
            projectId: '4e03afe911b374042e4236618aed2de3',
            defaultChainId: appConfig.chainId,
        };
        this._defaultChainId = this._options.defaultChainId;
        this._web3 = null;
        this._wcProvider = null;
        this._web3Modal = null;
        this._initialized = false;
        this._wallet = wallet;
    }

    // async init({ activateOnInit = true, address = '' } = {}) {
    async init({ activateOnInit = true, address = '' } = {}) {
        if (!this._initialized) {
            await this._createClient();

            if (this._web3 === null) {
                if (!(await this._checkPersistedSession())) {
                    await this._connect(this._wcProvider);
                }
                // await this.#initProvider(provider, activateOnInit);
            }

            if (!activateOnInit && address) {
                this.selectedAddress = address;
            }

            this._initialized = true;
        }

        return [this.selectedAddress];
    }

    async signTransaction(transaction, address) {
        if (!this._web3) {
            throw new Error('A provider is not set');
        }

        if (!transaction.from) {
            transaction.from = address;
        }

        const msgId = this.showNotification();

        try {
            if (!transaction.data) {
                transaction.data = '0x';
            }

            const { transactionHash } = await this._web3.eth.sendTransaction(transaction);

            this.hideNotification(msgId);

            return transactionHash;
        } catch (error) {
            this.hideNotification(msgId);

            if (error.message.indexOf('User rejected') > -1) {
                throw new Error('User cancelled the transaction');
            } else {
                console.error(error);
            }
        }
    }

    /**
     * @param {string} message
     * @param {string} account
     * @return {Promise<string>}
     */
    async personalSign(message, account) {
        let msg = '';

        if (this._web3) {
            const msgId = this.showNotification();

            try {
                msg = await this._web3.eth.personal.sign(message, account, '');

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
            const accounts = await this.init();

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

    async disconnect(dontDisconnectWC) {
        if (this._wcProvider) {
            if (!dontDisconnectWC) {
                await this._wcProvider.disconnect();
            }

            this._wcProvider = null;
            this._web3 = null;

            await this._wallet.logout(true);
        }
    }

    web3() {
        return this._web3;
    }

    isCorrectChainId(chainId) {
        return toInt(this.chainId) === (chainId || toInt(OPERA_CHAIN_ID));
    }

    async _checkPersistedSession() {
        // const pairings = this._wcProvider.client.pairing.getAll({ active: true });
        const { session } = this._wcProvider;

        if (session) {
            await this._onSessionConnected(session);

            return true;
        }

        return false;
    }

    async _onSessionConnected(session) {
        // console.log('SESSION:', session);

        const allNamespaceAccounts = Object.values(session.namespaces)
            .map(namespace => namespace.accounts)
            .flat();

        const chainData = allNamespaceAccounts[0].split(':');
        // const caipChainId = `${chainData[0]}:${chainData[1]}`;
        // const accounts = allNamespaceAccounts.map((account) => account.split(':')[2];
        await this._setChainId(toInt(chainData[1]));
        await this._setAddress(chainData[2]);

        this._createProvider();
    }

    async _setChainId(chainId) {
        const provider = this._web3;

        await delay(100);

        if (chainId) {
            this.chainId = chainId;
        } else if (provider && provider.chainId) {
            this.chainId = provider.chainId;
        } else {
            this.chainId = this._defaultChainId;
        }

        // console.log('chainid', chainId, this.chainId);
    }

    async _setAddress(address = '') {
        if (address) {
            this.selectedAddress = address;
            this.active = true;
        }
    }

    async _connect(provider) {
        const chainId = toInt(this._options.defaultChainId);

        const session = await provider.connect({
            namespaces: {
                eip155: {
                    methods: [
                        'eth_sendTransaction',
                        'eth_signTransaction',
                        'eth_sign',
                        'personal_sign',
                        'eth_signTypedData',
                    ],
                    chains: [`eip155:${chainId}`],
                    events: ['chainChanged', 'accountsChanged'],
                    rpcMap: { 250: RPC_URL, '0xfa': RPC_URL },
                },
            },
            pairingTopic: undefined,
        });

        console.log('SESSION: ', session);

        this._createProvider();
        const accounts = await provider.enable();
        console.log('ACCOUNTS', accounts);
        await this._setChainId();
        await this._setAddress(accounts[0]);

        this._web3Modal.closeModal();
    }

    async _createClient() {
        const { projectId, logger = 'debug', relayUrl = 'wss://relay.walletconnect.com' } = this._options;

        if (!projectId) {
            throw new Error('No project id provided');
        }

        this._wcProvider = await UniversalProvider.init({ projectId, logger, relayUrl });
        this._web3Modal = new Web3Modal({
            projectId,
            walletConnectVersion: 2,
            // standaloneChains: namespaces.eip155.chains,
        });

        this._subscribeToWCProviderEvents(this._wcProvider);
    }

    _subscribeToWCProviderEvents(provider) {
        provider.on('display_uri', async uri => {
            console.log('EVENT', 'QR Code Modal open', uri);
            await this._web3Modal.openModal({ uri });
        });

        // Subscribe to session event
        provider.on('session_event', ({ event, chainId }) => {
            console.log('EVENT', 'session_event');
            console.log(event, chainId);
        });

        // Subscribe to session update
        provider.on('session_update', ({ topic, session }) => {
            console.log('EVENT', 'session_updated', topic, session);
        });

        provider.on('session_delete', ({ id, topic }) => {
            console.log('EVENT', 'session_deleted');
            console.log(id, topic);
            this.disconnect(true);
        });
    }

    _createProvider() {
        this._web3 = new Web3(this._wcProvider);
    }
}
