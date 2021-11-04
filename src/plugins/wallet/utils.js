import { i18n } from '@/plugins/vue-i18n.js';
import { wallet } from '@/plugins/wallet/Wallet.js';
import { EventBus } from 'fantom-vue-components/src/mixins/event-bus.js';
import { toBigNumber, toHex } from '@/utils/big-number.js';
import { getErc20TokenBalance } from '@/modules/wallet/queries/erc20-token-balance.js';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { getErc20TokenAllowance } from '@/modules/wallet/queries/erc20-token-allowance.js';
import erc20Utils from '@/utils/erc20-utils.js';

const eventBus = new EventBus();

/**
 * Check if wallet is connected, if not, show wallet picker window
 *
 * @return {Promise<boolean>}
 */
export async function checkWallet() {
    let ok = false;

    if (!wallet.connected) {
        const payload = {};

        eventBus.emit('show-wallet-picker', payload);

        const walletInfo = await payload.promise;
        if (walletInfo && walletInfo.walletSet) {
            ok = true;
        }
    } else {
        ok = true;
    }

    return ok;
}

/**
 * @param {string} tokenAddress
 * @param {string} [userAddress] If not set, current wallet address will be taken
 * @return {Promise<null|BigNumber>}
 */
export async function getUserBalance(tokenAddress = '', userAddress = '') {
    let walletAddress = userAddress;

    if (!walletAddress) {
        const walletOk = await checkWallet();

        if (walletOk) {
            walletAddress = wallet.account;
        }
    }

    if (walletAddress) {
        return toBigNumber(await getErc20TokenBalance(walletAddress, tokenAddress));
    }

    return null;
}

/**
 * Checks if user (current wallet address) have sufficient balance
 *
 * @param {string|number|BigNumber} value
 * @param {string} tokenAddress
 * @param {string} [tokenSymbol]
 * @return {Promise<null|BigNumber>} null or balance
 */
export async function checkUserBalance(value, tokenAddress, tokenSymbol) {
    const balance = await getUserBalance(tokenAddress);

    if (toBigNumber(value).isGreaterThan(balance)) {
        notifications.add({
            text: tokenSymbol
                ? i18n.t('insufficientTokenBalance', { token: tokenSymbol })
                : i18n.t('insufficientBalance'),
            type: 'error',
        });

        return null;
    }

    return balance;
}

/**
 * @param {string} tokenAddress
 * @param {string} contract
 * @param {string} [userAddress] If not set, current wallet address will be taken
 * @return {Promise<null|BigNumber>}
 */
export async function getUserAllowance(tokenAddress = '', contract = '', userAddress = '') {
    let walletAddress = userAddress;

    if (!walletAddress) {
        const walletOk = await checkWallet();

        if (walletOk) {
            walletAddress = wallet.account;
        }
    }

    if (walletAddress) {
        return toBigNumber(await getErc20TokenAllowance(walletAddress, tokenAddress, contract));
    }

    return null;
}

/**
 * @param {string|number|BigNumber} value
 * @param {string} tokenAddress
 * @param {string} contract
 * @param {string} [txCode]
 * @return {Promise<null|{data: string, chainId: string, to: string, value: string}>}
 */
export async function getUserAllowanceTx({ value = '', tokenAddress = '', contract = '', txCode = 'allowance' }) {
    const bValue = toBigNumber(value);
    const tx = erc20Utils.erc20IncreaseAllowanceTx(tokenAddress, contract, toHex(bValue.plus(10)));

    tx._code = txCode;

    return tx;
}

/*export async function getUserAllowanceTx({ value = '', tokenAddress = '', contract = '', txCode = 'allowance' }) {
    const allowance = await getUserAllowance(tokenAddress, contract);
    const bValue = toBigNumber(value);

    if (bValue.isGreaterThan(allowance)) {
        const tx = erc20Utils.erc20IncreaseAllowanceTx(tokenAddress, contract, toHex(bValue.plus(10)));

        tx._code = txCode;

        return tx;
    }

    return null;
}*/
