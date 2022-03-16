/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const TerserPlugin = require('terser-webpack-plugin');
const withAntdLess = require('next-plugin-antd-less');

const isProd = process.env.ENV === 'production';

module.exports = withPlugins([
    [
        withPWA,
        {
            pwa: {
                dest: 'public',
                disable: !isProd,
            },
            trailingSlash: true,
            webpack(config) {
                config.optimization.minimizer = [];
                config.optimization.minimizer.push(
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                drop_console: isProd,
                            },
                        },
                    }),
                );
                return config;
            },
            env: {
                ENV: process.env.ENV,
                SITE_NAME: process.env.SITE_NAME,
                API_URL: process.env.API_URL,
            },
        },
    ],
    [
        withAntdLess,
        {
            modifyVars: {
                '@primary-color': '#1B73E6',
                '@processing-color': '#1B73E6',
            },
        },
    ],
]);
