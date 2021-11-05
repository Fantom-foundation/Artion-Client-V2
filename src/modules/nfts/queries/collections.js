import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getCollections() {
    const query = {
        query: gql`
            query GetCollections {
                collections(first: 50) {
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        cursor
                        node {
                            contract
                            name
                            image
                        }
                    }
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'collections');
}
