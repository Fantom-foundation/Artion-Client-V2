import { artionFApolloClient } from '@/plugins/apollo/apollo-provider.js';

/**
 * @param {string} imageThumbUrl
 * @return {string}
 */
export function getImageThumbUrl(imageThumbUrl) {
    if (!imageThumbUrl) {
        return '';
    }

    return `${artionFApolloClient.getCurrentHttpProviderOrigin()}${imageThumbUrl}`;
}

/**
 * @param {string} hash
 * @return {string}
 */
export function getIPFSUrl(hash) {
    return `https://cloudflare-ipfs.com/ipfs/${hash}`;
}
