import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserOwnershipTokens(address = '', pagination = {}, collection = null) {
    const query = {
        query: gql`
            query GetUserOwnershipTokens(
                $collection: Address
                $address: Address!
                $first: Int
                $after: Cursor
                $last: Int
                $before: Cursor
            ) {
                user(address: $address) {
                    ownerships(collection: $collection, first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            node {
                                contract
                                tokenId
                                token {
                                    contract
                                    tokenId
                                    name
                                    description
                                    image
                                    imageThumb
                                    likes
                                }
                            }
                        }
                    }
                }
            }
        `,
        variables: {
            address,
            collection,
            ...pagination,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'user.ownerships');
}
