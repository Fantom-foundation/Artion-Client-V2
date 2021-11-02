import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

/**
 * @param {string} username
 * @param {string} bio
 * @param {string} email
 * @param {string} avatar
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function updateUser({ username = '', bio = '', email = '' }) {
    const mutation = {
        mutation: gql`
            mutation UpdateUser($username: String, $bio: String, $email: String!) {
                updateUser(username: $username, bio: $bio, email: $email)
            }
        `,
        variables: { username, bio, email },
    };

    return gqlMutation(mutation, 'updateUser');
}
