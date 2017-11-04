const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'docs') // usefull for gh-pages
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'html-loader?minimize=true'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    // use: ['css-loader', 'sass-loader'],
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
        new CleanWebpackPlugin(['docs']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJSPlugin({
            sourceMap: false,
            parallel: 4,
            extractComments: true
        }),
        new ExtractTextPlugin({filename: 'styles.css'}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}}
        })
    ]
});