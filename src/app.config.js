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
                http: (process.env.VUE_APP_API_URL || 'http://localhost:8081/') + 'authorized',
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
    // default options for production build
    build: {
        // output dir for production build
        outputDir: 'dist',
    },
};

module.exports = appConfig;
