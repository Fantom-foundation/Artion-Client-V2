import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql-query.js';

export async function getCollections() {
    const query = {
        query: gql`
            query Collections {
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
