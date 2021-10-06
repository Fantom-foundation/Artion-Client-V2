import { clone } from 'fantom-vue-components/src/utils';
import { apolloClient } from '@/plugins/apollo-provider.js';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';

export async function gqlQuery(query, fieldName = '') {
    try {
        const response = await apolloClient.query(query);

        if (response && response.data && response.data[fieldName]) {
            return clone(response.data[fieldName]);
        }

        return null;
    } catch (error) {
        console.error(error);
        notifications.add({
            type: 'error',
            text: error,
        });
    }

    return null;
}
