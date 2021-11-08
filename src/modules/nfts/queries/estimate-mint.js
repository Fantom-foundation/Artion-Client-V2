import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function estimateMintFeeGas(user, contract, tokenUri) {
    const query = {
        query: gql`
            query EstimateMintFeeGas($user: Address!, $contract: Address!, $tokenUri: String!) {
                estimateMintFeeGas(user: $user, contract: $contract, tokenUri: $tokenUri) {
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
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'estimateMintFeeGas');
}
