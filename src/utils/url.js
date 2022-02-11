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
 * @param {string} contract
 * @return {string}
 */
export function getCollectionImageUrl(contract) {
    if (!contract) {
        return '';
    }

    return `${artionFApolloClient.getCurrentHttpProviderOrigin()}/images/collection/${contract}/`;
}

/**
 * @param {string} hash
 * @return {string}
 */
export function getIPFSUrl(hash) {
    if (!hash) {
        return '';
    }

    return `https://cloudflare-ipfs.com/ipfs/${hash}`;
}

/**
 * @param {string} contract
 * @param {string} tokenId
 * @return {string}
 */
export function getTokenJsonMetadataUrl(contract, tokenId) {
    if (!contract || !tokenId) {
        return '';
    }

    return `${artionFApolloClient.getCurrentHttpProviderOrigin()}/metadata/token/${contract}/${tokenId}`;
}
