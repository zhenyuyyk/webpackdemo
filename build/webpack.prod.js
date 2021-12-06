const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const env = require("../config/prod.env");
const webpack = require("webpack");
// 代码分离
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// gzip压缩
const CompressionPlugin = require("compression-webpack-plugin");
// css压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            "process.env": env,
        }),
        new BundleAnalyzerPlugin(),
        new CompressionPlugin(),
        new CssMinimizerPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                lodash: {
                    name: "lodash",
                    chunks: "async",
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    priority: 40,
                },
            },
        },
    },
});
