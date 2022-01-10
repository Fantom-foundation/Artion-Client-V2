import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function estimateMintFeeGas(user, contract, tokenUri, royalty) {
    const query = {
        query: gql`
            query EstimateMintFeeGas($user: Address!, $contract: Address!, $tokenUri: String!, $royalty: Int!) {
                estimateMintFeeGas(user: $user, contract: $contract, tokenUri: $tokenUri, royalty: $royalty) {
                    error
                    platformFee
                    gas
                }
            }
        `,
        variables: {
            user,
            contract,
            tokenUri,
            royalty,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'estimateMintFeeGas');
}
