import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';

export async function updateNotificationSettings(settings) {
    const mutation = {
        mutation: gql`
            mutation UpdateNotificationSettings($settings: InputNotificationSettings!) {
                updateNotificationSettings(settings: $settings)
            }
        `,
        variables: { settings },
    };

    return gqlMutation(mutation, 'updateNotificationSettings');
}
