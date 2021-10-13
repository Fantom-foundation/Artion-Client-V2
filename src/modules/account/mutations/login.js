import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

/**
 * @param {string} user
 * @param {string} challenge
 * @param {string} signature
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function login({ user = '', challenge = '', signature = '' }) {
    const mutation = {
        mutation: gql`
            mutation Login($user: Address!, $challenge: String!, $signature: String!) {
                login(user: $user, challenge: $challenge, signature: $signature)
            }
        `,
        variables: { user, challenge, signature },
    };

    return gqlMutation(mutation, 'login');
}
