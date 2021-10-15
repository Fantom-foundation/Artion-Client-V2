import { artionFApolloClient } from '@/plugins/apollo/apollo-provider.js';

export function getImageThumbUrl(imageThumbUrl) {
    if (!imageThumbUrl) {
        return '';
    }

    return `${artionFApolloClient.getCurrentHttpProviderOrigin()}${imageThumbUrl}`;
}
