const appConfig = require('./src/app.config.js');
// const path = require('path');
// const svgFilePath = path.join(__dirname, './src/assets/svg');

console.log('--- app config ---');
console.log(appConfig);

module.exports = {
    publicPath: appConfig.routerHashMode ? '' : '/',
    outputDir: appConfig.build.outputDir,

    /*
    css: {
        loaderOptions: {
            scss: {
                prependData: appConfig.scssData,
            },
        },
    },
*/

    pwa: {
        name: appConfig.pwa.name,
        themeColor: appConfig.pwa.mainColor,
        msTileColor: appConfig.pwa.mainColor,
        assetsVersion: appConfig.pwa.assetsVersion,
        manifestOptions: {
            background_color: appConfig.pwa.mainColor,
        },
        workboxOptions: {
            skipWaiting: true,
        },
    },

    /*
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false,
        },
    },
*/

    chainWebpack: config => {
        // sets page title
        config.plugin('html').tap(_args => {
            _args[0].title = appConfig.title;
            _args[0].description = appConfig.description;
            _args[0].keywords = appConfig.keywords;
            _args[0].favicon = appConfig.favicon;
            _args[0].imageUrl = appConfig.imageUrl || '';
            return _args;
        });

        if (!appConfig.usePWA) {
            config.plugins.delete('pwa');
            config.plugins.delete('workbox');
        }
    },

    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
    },
};
