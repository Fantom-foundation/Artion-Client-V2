import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';

export async function getErc20TokenBalance(ownerAddress = '', tokenAddress = '') {
    const query = {
        query: gql`
            query GetErc20TokenBalance($owner: Address!, $token: Address!) {
                ercTokenBalance(owner: $owner, token: $token)
            }
        `,
        variables: {
            owner: ownerAddress,
            token: tokenAddress,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'ercTokenBalance', fantomApolloClient);
}
