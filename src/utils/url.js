import { artionFApolloClient } from '@/plugins/apollo/apollo-provider.js';

export function getImageProxyUrl(imageProxyUrl) {
    if (!imageProxyUrl) {
        return '';
    }

    return `${artionFApolloClient.getCurrentHttpProviderOrigin()}${imageProxyUrl}`;
}
