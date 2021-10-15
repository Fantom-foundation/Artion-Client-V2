import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getLoggedUser() {
    const query = {
        query: gql`
            query GetLoggedUser {
                loggedUser {
                    address
                    username
                    bio
                    email
                    avatar
                    avatarThumb
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'loggedUser');
}
