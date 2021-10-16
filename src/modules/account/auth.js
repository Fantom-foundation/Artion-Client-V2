import { initiateLogin } from '@/modules/account/mutations/initiate-login.js';
import { wallet } from '@/plugins/wallet/Wallet.js';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { login } from '@/modules/account/mutations/login.js';
// import { getLoggedUser } from '@/modules/account/queries/logged-user.js';
import { getUser } from '@/modules/account/queries/user.js';
import { router } from '@/main.js';

export function getBearerToken() {
    return wallet.getBearerToken();
}

export async function signIn() {
    const { account } = wallet;

    if (!wallet.connected || !account) {
        return false;
    }

    const challenge = await initiateLogin();

    try {
        const signature = await wallet.personalSign(challenge, account);
        const bearerToken = await login({ user: account, challenge, signature });

        wallet.setBearerToken(bearerToken);

        await setUser(account, true);

        return true;
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

export async function setUser(account, logged) {
    const user = await getUser(account);

    if (logged) {
        user.logged = true;
    }

    wallet.setUser(user);
}

/**
 * Checks if user is logged, if not, try to log him
 * @return {Promise<boolean>}
 */
export async function checkSignIn() {
    let ok = true;

    if (!getBearerToken()) {
        ok = await signIn();

        if (!ok) {
            // redirect to the homepage
            router.push('/');
        }
    }

    return ok;
}

/*
export async function setLoggedUser() {
    const user = await getLoggedUser();

    wallet.setLoggedUser(user);
}
*/
