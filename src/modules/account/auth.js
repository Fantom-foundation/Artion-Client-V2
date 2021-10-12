import { initiateLogin } from '@/modules/account/mutations/initiate-login.js';
import { wallet } from '@/plugins/wallet/Wallet.js';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { login } from '@/modules/account/mutations/login.js';

export function getBearerToken() {
    return wallet.getBearerToken();
}

export async function signIn() {
    const { account } = wallet;

    if (!wallet.connected || !account) {
        return '';
    }

    const challenge = await initiateLogin();

    try {
        const signature = await wallet.personalSign(challenge, account);
        const bearerToken = await login({ user: account, challenge, signature });

        wallet.setBearerToken(bearerToken);
    } catch (error) {
        if (error.code === 4001) {
            notifications.add({
                type: 'error',
                text: 'User denied message signature.',
            });
        }

        console.error(error);
    }
}
