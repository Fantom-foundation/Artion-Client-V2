import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getLoggedUserShippingAddress() {
    const query = {
        query: gql`
            query GetLoggedUserShippingAddress {
                loggedUserShippingAddress {
                    fullname
                    phone
                    street
                    apartment
                    city
                    state
                    country
                    zip
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'loggedUserShippingAddress');
}
