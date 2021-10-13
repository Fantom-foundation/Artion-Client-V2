import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getCollections() {
    const query = {
        query: gql`
            query GetCollections {
                collections {
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
                            type
                            name
                            symbol
                            created
                            isActive
                        }
                    }
                }
            }
        `,
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'collections');
}
