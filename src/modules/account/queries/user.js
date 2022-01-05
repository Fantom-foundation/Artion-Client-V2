import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
// import { wallet } from '@/plugins/wallet/Wallet.js';
// import { compareAddresses } from '@/utils/address.js';

export async function getUser(address = '') {
    const query = {
        query: gql`
            query GetUser($address: Address!) {
                user(address: $address) {
                    address
                    username
                    bio
                    email
                    avatar
                    avatarThumb
                    banner
                }
            }
        `,
        variables: {
            address,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'user');
}

// TMP
/*
export async function isLoggedUserModerator() {
    return compareAddresses(wallet.account, '0xa332e0a687c8e68fe8c59da2361f5b1a9991445d');
}
*/

export async function isLoggedUserModerator() {
    const query = {
        query: gql`
            query IsLoggedUserModerator {
                isLoggedModerator
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'isLoggedModerator');
}
