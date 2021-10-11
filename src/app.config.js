const appConfig = {
    // app name - used in titles
    name: 'Artion',
    // app main title
    title: 'Artion, NFT markteplace',
    // app description
    description: 'Artion, NFT markteplace',
    // app keywords
    keywords: 'Artion, NFT, NFTs, Fantom',
    // app code
    code: 'artion',
    // apollo client settings
    apollo: {
        // list of providers. if one of them is unavailable, another is randomly picked
        providers: [
            {
                http: 'https://artion-api-a.fantom.network/graphql',
                // for subscriptions
                ws: '',
            },
        ],
        // index into providers array of default provider or 'random' - takes index randomly
        defaultProviderIndex: 'random',
    },
    // app settings
    settings: {
        languages: [
            { label: 'English', value: 'en' },
            // { label: 'русский', value: 'ru' },
        ],
        defaultLanguage: 'en',
        mobileViewBreakpoint: '64em', // set also variable $breakpoint-mw in assets/scss/_variables.scss
        themes: ['default', 'theme-dark'],
    },
    // progressive web application
    usePWA: true,
    // pwa settings
    pwa: {
        // name used in pwa manifest
        name: 'Artion',
        categories: ['finance'],
        mainColor: '#ffffff',
        assetsVersion: '1',
    },
    // if `true`, every route will be redirected to 'under maintenance' page
    underMaintenance: false,
    // use hash in address
    routerHashMode: false,
    // Opera chain id
    chainId: '0xfa',
    // JSON-RPC endpoint
    rpc: 'https://rpcapi.fantom.network/',
    // used in links pointing to fantom explorer
    explorerUrl: 'https://ftmscan.com/',
    // used in links pointing to validators
    explorerUrl2: 'https://explorer.fantom.network/',
    // default options for production build
    build: {
        // output dir for production build
        outputDir: 'dist',
    },
};

appConfig.mainnet = {
    chainId: appConfig.chainId,
    rpc: appConfig.rpc,
    explorerUrl: appConfig.explorerUrl,
    explorerUrl2: appConfig.explorerUrl2,
};

module.exports = appConfig;
