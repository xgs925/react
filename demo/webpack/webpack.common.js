const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const crypto = require('crypto');
const cssLoader = (localModules)=>{return [// CSS分离打包
    MiniCssExtractPlugin.loader,
    // css作为模块调用
    {
        loader: 'css-loader',
        options: {
            modules: localModules,
            localIdentName: '',
            getLocalIdent: (context, localIdentName, localName, options) => {
                const hash = crypto.createHash('sha256');
                hash.update(context.resource.substring(context.rootContext.length));
                const arr = [];
                arr.push(localName);
                arr.push(hash.digest('base64').substring(0,8));
                return arr.join('_');
            },
            sourceMap: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                // css自动补全
                autoprefixer()
            ],
            sourceMap: true
        }
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: true
        }
    }
];};
module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: [/components|routers/],
                use: cssLoader(true)
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: [/components|routers/],
                use: cssLoader(false)
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
            },
        ]
    },
    optimization: {
        // 模块以hash作为区分
        moduleIds: 'hashed',
        // 独立打包runtime模块
        runtimeChunk: 'single',
        // 独立打包vendors模块
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        // 加入第三方静态资源代码
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['statics/thirdPart.js'],
        //     append: true
        // }),
        // new CopyWebpackPlugin([
        //     {context: './src/statics', from: '**/*', to: './statics'}
        // ])
    ],
    resolve: {
        alias: {
            // 设置依赖路径
            assets: path.resolve(__dirname, './../src/assets/')
        }
    }
};
