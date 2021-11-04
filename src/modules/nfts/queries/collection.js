import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

/**
 * @param {string} contract
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function getCollection(contract = '') {
    const query = {
        query: gql`
            query GetCollection($contract: Address!) {
                collection(contract: $contract) {
                    contract
                    type
                    name
                    symbol
                    created
                    isActive
                }
            }
        `,
        variables: { contract },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'collection');
}

/**
 * Collection object.
 * @typedef {Object} Collection
 * @property {string} contract
 * @property {string} type
 * @property {string} name
 * @property {string} symbol
 * @property {string} created
 * @property {boolean} isActive
 */
