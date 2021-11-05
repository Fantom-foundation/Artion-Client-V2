import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

export async function getUserFollowers(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserFollowers($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    followers(first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            node {
                                follower
                                followerUser {
                                    address
                                    username
                                    avatarThumb
                                }
                            }
                        }
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

    return gqlQuery(query, 'user.followers');
}

export async function getUserFollowing(address = '', pagination = {}) {
    const query = {
        query: gql`
            query GetUserFollowing($address: Address!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
                user(address: $address) {
                    following(first: $first, after: $after, last: $last, before: $before) {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            node {
                                followed
                                followedUser {
                                    address
                                    username
                                    avatarThumb
                                }
                            }
                        }
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

    return gqlQuery(query, 'user.following');
}
