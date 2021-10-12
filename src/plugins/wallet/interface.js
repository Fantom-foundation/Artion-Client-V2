import { implementsInterface } from '@/utils/interface.js';

const walletInterface = [
    'init',
    'signTransaction',
    'personalSign',
    'getAccount',
    'getChainId',
    'name',
    'isInstalled',
    'disconnect',
    'web3',
];

export function implementsWalletInterface(wClass) {
    const notFound = implementsInterface(wClass, walletInterface);

    if (notFound.length > 0) {
        throw new Error(`Class must implement: ${notFound.join(', ')}`);
    }
}
