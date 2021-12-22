import { clone } from 'fantom-vue-components/src/utils';
import { artionApolloClient } from '@/plugins/apollo/apollo-provider.js';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { getNestedProp } from 'fantom-vue-components/src/utils/index.js';

export async function gqlQuery(query, fieldName = '', client = artionApolloClient, silent = false) {
    try {
        const response = await client.query(query);
        let data = null;

        if (response && response.data && (data = getNestedProp(response.data, fieldName)) !== null) {
            return clone(data);
        }

        return null;
    } catch (error) {
        if (!silent) {
            notifications.add({
                type: 'error',
                text: error,
            });
        }
        // console.error(error);
        throw error;
    }
}

export async function gqlMutation(mutation, fieldName = '', client = artionApolloClient, silent = false) {
    try {
        const response = await client.mutate(mutation);
        let data = null;

        if (response && response.data && (data = getNestedProp(response.data, fieldName)) !== null) {
            return clone(data);
        }

        return null;
    } catch (error) {
        if (!silent) {
            notifications.add({
                type: 'error',
                text: error,
            });
        }
        // console.error(error);
        throw error;
    }
}
