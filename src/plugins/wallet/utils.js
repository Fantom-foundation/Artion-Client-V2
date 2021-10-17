import { wallet } from '@/plugins/wallet/Wallet.js';
import { EventBus } from 'fantom-vue-components/src/mixins/event-bus.js';

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
