import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

/**
 * @param {string} address
 */
export async function followUser(user) {
    const mutation = {
        mutation: gql`
            mutation FollowUser($user: Address!) {
                followUser(user: $user)
            }
        `,
        variables: { user },
    };

    return gqlMutation(mutation, 'followUser');
}

/**
 * @param {string} address
 */
export async function unFollowUser(user) {
    const mutation = {
        mutation: gql`
            mutation UnFollowUser($user: Address!) {
                unfollowUser(user: $user)
            }
        `,
        variables: { user },
    };

    return gqlMutation(mutation, 'unfollowUser');
}
