const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const base = {
    devtool: 'source-map',

    entry: {
        app: ['./src/app.scss'],
        background: ['./src/background.ts'],
        popup: ['./src/popup.tsx'],
        "page-analyzer": ['./src/page-analyzer.ts'],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            }, {
                test: /\.scss$/,
                use: [
                    "file-loader?name=[name].css",
                    "extract-loader",
                    "css-loader",
                    "sass-loader?sourceMap",
                ],
            }, {
                test: /\.css$/,
                use: [
                    "file-loader?name=[name].css",
                    "extract-loader",
                    "css-loader",
                ],
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader?name=[name].[ext]'
            }
        ]
    },
};

module.exports = [
    Object.assign({}, base, {
        output: {
            path: path.join(__dirname, 'dist-firefox'),
            filename: '[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({chunks: ['popup'], title: 'Trustless', filename: 'popup.html',}),
            new HtmlWebpackIncludeAssetsPlugin({assets: ['app.css'], append: true}),
            new webpack.DefinePlugin({
                BROWSER: JSON.stringify('firefox')
            }),
            new CopyWebpackPlugin([
                {from: './icons', to: 'icons'},
                {from: './src/manifest-firefox.json', to: 'manifest.json'}
            ]),
        ],
    }),
    Object.assign({}, base, {
        output: {
            path: path.join(__dirname, 'dist-chrome'),
            filename: '[name].js',
        },
        plugins: [
            new HtmlWebpackPlugin({chunks: ['popup'], title: 'Trustless', filename: 'popup.html',}),
            new HtmlWebpackIncludeAssetsPlugin({assets: ['app.css'], append: true}),
            new webpack.DefinePlugin({
                BROWSER: JSON.stringify('chrome')
            }),
            new CopyWebpackPlugin([
                {from: './icons', to: 'icons'},
                {from: './src/manifest-chrome.json', to: 'manifest.json'}
            ]),
        ],
    }),
];
