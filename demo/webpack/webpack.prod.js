const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './../dist'),
        // publicPath: undefined,
        publicPath: '//test.sogou.com/',
        filename: '[name].[chunkhash:8].js'
    },
    plugins: [
        // 混淆js
        new UglifyJSPlugin(),
        // 混淆css
        new OptimizeCSSAssetsPlugin({}),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css',
            chunkFilename: '[name].[chunkhash:8].css',
        })
    ]
});
