import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';

export async function getDefiTokens() {
    const query = {
        query: gql`
            query GetDefiTokens {
                defiTokens {
                    address
                    symbol
                    logoUrl
                    decimals
                    price
                    priceDecimals
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'defiTokens', fantomApolloClient);
}
