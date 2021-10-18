import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

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
