import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserTokenCounters(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserTokenCounters($address: Address!) {
                user(address: $address) {
                    ownerships(first: 0) {
                        totalCount
                    }
                    tokenLikes(first: 0) {
                        totalCount
                    }
                    createdTokens(first: 0) {
                        totalCount
                    }
                    activities(first: 0) {
                        totalCount
                    }
                    offers(first: 0) {
                        totalCount
                    }
                    myOffers(first: 0) {
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
