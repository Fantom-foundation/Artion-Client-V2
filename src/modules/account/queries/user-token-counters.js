import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserTokenCounters(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserTokenCounters($address: Address!) {
                user(address: $address) {
                    ownerships(first: 1) {
                        totalCount
                    }
                    tokenLikes(first: 1) {
                        totalCount
                    }
                    createdTokens(first: 1) {
                        totalCount
                    }
                    activities(first: 1) {
                        totalCount
                    }
                    offers(first: 1) {
                        totalCount
                    }
                    myOffers(first: 1) {
                        totalCount
                    }
                }
            }
        `,
        variables: {
            address,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return await gqlQuery(query, 'user');
}
