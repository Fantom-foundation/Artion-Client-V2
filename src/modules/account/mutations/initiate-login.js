import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

export async function initiateLogin() {
    const mutation = {
        mutation: gql`
            mutation InitiateLogin {
                initiateLogin
            }
        `,
    };

    return gqlMutation(mutation, 'initiateLogin');
}
