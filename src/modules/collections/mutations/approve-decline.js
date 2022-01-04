import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

/**
 * @param {string} contract
 */
export async function approveCollection(contract = '') {
    const mutation = {
        mutation: gql`
            mutation ApproveCollection($contract: Address!) {
                approveCollection(contract: $contract)
            }
        `,
        variables: { contract },
    };

    return gqlMutation(mutation, 'approveCollection');
}

/**
 * @param {string} contract
 */
export async function declineCollection(contract = '') {
    const mutation = {
        mutation: gql`
            mutation DeclineCollection($contract: Address!) {
                declineCollection(contract: $contract)
            }
        `,
        variables: { contract },
    };

    return gqlMutation(mutation, 'declineCollection');
}
