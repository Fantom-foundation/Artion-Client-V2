/**
 * MetamaskCurrency info object
 * @typedef {Object} MetamaskCurrency
 * @property {string} name
 * @property {string} symbol 2-6 characters long
 * @property {number} decimals 18
 */

/**
 * MetamaskChain info object
 * @typedef {Object} MetamaskChain
 * @property {string} chainId A 0x-prefixed hexadecimal string
 * @property {string} chainName
 * @property {MetamaskCurrency} nativeCurrency
 * @property {string[]} rpcUrls
 * @property {string[]} [blockExplorerUrls]
 * @property {string[]} [iconUrls] Currently ignored.
 */

/**
 * MetamaskAssetOptions info object
 * @typedef {Object} MetamaskAssetOptions
 * @property {string} address The address that the token is at
 * @property {string} symbol A ticker symbol or shorthand, up to 5 chars
 * @property {number} decimals The number of decimals in the token
 * @property {string} image A string url of the token logo
 */

/**
 * MetamaskAsset info object
 * @typedef {Object} MetamaskAsset
 * @property {'ERC20'} type Initially only supports ERC20
 * @property {MetamaskAssetOptions} options
 */
