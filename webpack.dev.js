const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: [
        // 'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch',
        './src/index.js'
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'eval',

    devServer: {
        contentBase: './dist',
        port: 3000,
        hot: true,
        // hotOnly: true,
        open: false
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'html-loader?minimize=false'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({disable: true})
    ]
});