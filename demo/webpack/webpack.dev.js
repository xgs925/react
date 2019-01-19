const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 9088,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        })
    ]
});
