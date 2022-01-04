import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

/**
 * @param {string} contract
 */
export async function banCollection(contract = '') {
    const mutation = {
        mutation: gql`
            mutation BanCollection($contract: Address!) {
                banCollection(contract: $contract)
            }
        `,
        variables: { contract },
    };

    return gqlMutation(mutation, 'banCollection');
}

/**
 * @param {string} contract
 */
export async function unbanCollection(contract = '') {
    const mutation = {
        mutation: gql`
            mutation UnbanCollection($contract: Address!) {
                unbanCollection(contract: $contract)
            }
        `,
        variables: { contract },
    };

    return gqlMutation(mutation, 'unbanCollection');
}
