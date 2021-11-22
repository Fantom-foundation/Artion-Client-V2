import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getPayTokens() {
    const query = {
        query: gql`
            query GetPayTokens {
                payTokens {
                    contract
                    name
                    symbol
                    decimals
                    price
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'payTokens');
}
