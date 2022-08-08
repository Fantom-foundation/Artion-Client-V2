import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function advertisedCollection() {
    const query = {
        query: gql`
            query AdvertisedCollection {
                advertisedCollection {
                    contract
                    name
                    image
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'advertisedCollection');
}
