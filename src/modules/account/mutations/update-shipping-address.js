import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

/**
 * @param {string} fullname
 * @param {string} phone
 * @param {string} street
 * @param {string} apartment
 * @param {string} city
 * @param {string} state
 * @param {string} country
 * @param {string} zip
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function updateShippingAddress({
    fullname = '',
    phone = '',
    street = '',
    apartment = '',
    city = '',
    state = '',
    country = '',
    zip = '',
}) {
    const mutation = {
        mutation: gql`
            mutation UpdateShippingAddress(
                $fullname: String!
                $phone: String!
                $street: String!
                $apartment: String!
                $city: String!
                $state: String!
                $country: String!
                $zip: String!
            ) {
                updateShippingAddress(
                    address: {
                        fullname: $fullname
                        phone: $phone
                        street: $street
                        apartment: $apartment
                        city: $city
                        state: $state
                        country: $country
                        zip: $zip
                    }
                )
            }
        `,
        variables: { fullname, phone, street, apartment, city, state, country, zip },
    };

    return gqlMutation(mutation, 'updateShippingAddress');
}
