import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';

export async function getWalletInfo(address = '') {
    const query = {
        query: gql`
            query Erc20Assets($owner: Address!) {
                erc20Assets(owner: $owner) {
                    address
                    name
                    symbol
                    decimals
                    totalSupply
                    logoURL
                    balanceOf(owner: $owner)
                }
            }
        `,
        variables: {
            owner: address,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'erc20Assets', fantomApolloClient);
}
