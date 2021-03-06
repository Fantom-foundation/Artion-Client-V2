import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

export async function getTokenPriceHistory(contract = '', id = '', from, to) {
    const query = {
        query: gql`
            query GetTokenPriceHistory($contract: Address!, $tokenId: BigInt!, $from: Time!, $to: Time!) {
                token(contract: $contract, tokenId: $tokenId) {
                    priceHistory(from: $from, to: $to) {
                        time
                        price
                    }
                }
            }
        `,
        variables: {
            contract,
            tokenId: toHex(id),
            from,
            to,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'token.priceHistory');
}
