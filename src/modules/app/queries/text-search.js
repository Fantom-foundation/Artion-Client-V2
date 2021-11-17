import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

/**
 * @param {string} phrase
 * @param {number} [maxLength]
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function textSearch(phrase = '', maxLength = 15) {
    const query = {
        query: gql`
            query TextSearch($phrase: String!, $maxLength: Int = 15) {
                textSearch(phrase: $phrase, maxLength: $maxLength) {
                    collection {
                        contract
                        name
                        image
                    }
                    token {
                        contract
                        tokenId
                        name
                        imageThumb
                    }
                }
            }
        `,
        variables: {
            phrase,
            maxLength,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'textSearch');
}
