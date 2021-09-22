const path = require('path');
// const svgFilePath = path.join(__dirname, '../src/assets/svg');

module.exports = {
    stories: ['../src/**/*.stories.js'],
    addons: [
        '@storybook/addon-storysource',
        '@storybook/addon-a11y',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-viewport',
        'storybook-rtl-addon',
        'storybook-addon-themes',
        'storybook-vue-router',
        '@storybook/addon-docs',
        /*{
            name: '@storybook/addon-docs',
            options: {
                sourceLoaderOptions: {
                    injectStoryParameters: false,
                },
            },
            /!*
            options: {
                vueDocgenOptions: {
                    alias: {
                        '@': path.resolve(__dirname, '../src'),
                    },
                },
            },
            *!/
        },*/
    ],
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need

        // ---- scss config ----
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        // --- vue-svgicon config ---
        /*
        config.module.rules.push({
            test: /\.svg$/,
            include: [svgFilePath],
            loaders: [
                {
                    loader: require.resolve('@yzfe/vue-svgicon-loader'),
                    options: {
                        idSeparator: '_',
                        svgFilePath,
                    }

                }
            ]
        });

        // exclude svg file path from file-loader
        let rule = config.module.rules.find(r =>
            r.test && r.test.toString().includes('svg') &&
            r.loader && r.loader.includes('file-loader')
        );
        if (rule) {
            // rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
            rule.exclude = [svgFilePath];
        }

        // add transform asset option to vue-loader
        rule = config.module.rules.find(r =>
            r.test && r.test.toString().includes('vue') &&
            r.loader && r.loader.includes('vue-loader')
        );
        if (rule) {
            rule.options = {
                transformAssetUrls: {
                    icon: 'data'
                }
            }
        }

        // set icon alias
        config.resolve.alias['@icon'] = svgFilePath;
*/

        // --- set aliases ---
        config.resolve.alias['@'] = path.resolve(__dirname, '../src');

        // Return the altered config
        return config;
    },
};
