import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getCategories() {
    const query = {
        query: gql`
            query GetCategories {
                categories {
                    id
                    name
                    icon
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'categories');
}
