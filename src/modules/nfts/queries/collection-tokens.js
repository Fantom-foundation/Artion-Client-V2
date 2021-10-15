import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getCollectionTokens(contract = '', pagination = {}) {
    const query = {
        query: gql`
            query GetCollectionTokens($contract: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                collection(contract: $contract) {
                    tokens(first: $first, after: $after, last: $last, before: $before) {
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
                                tokenId
                                name
                                description
                                image
                                imageThumb
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            contract,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    const data = await gqlQuery(query, 'collection');

    return data ? data.tokens : null;
}
